package jwtService

import (
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/customErrors"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"atom24/helpers/fmthelper"
	"atom24/helpers/typehelper"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"path"
	"strings"
	"time"

	"github.com/ahmetb/go-linq/v3"

	"github.com/dgrijalva/jwt-go"
)

const DEFAULT_ACCESS_DURATION = time.Second * 60 * 10
const DEFAULT_REFRESH_DURATION = time.Hour * 24

type jwtService struct {
	accessTokenDuration  time.Duration
	refreshTokenDuration time.Duration

	connectionFactory definitions.ConnectionFactory
	roleService       definitions.RoleService

	privateKey []byte
	publicKey  []byte
}

func ProvideJWTService(configService definitions.ConfigService,
	cf definitions.ConnectionFactory,
	rs definitions.RoleService) definitions.JWTService {

	var jwtService jwtService
	jwtService.roleService = rs
	jwtService.connectionFactory = cf
	// #region setup cypher keys

	var cwd = configService.GetCWD()

	prvKey, err := ioutil.ReadFile(path.Join(cwd, "keys", "id_rsa"))
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}
	pubKey, err := ioutil.ReadFile(path.Join(cwd, "keys", "id_rsa.pub"))
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}

	jwtService.privateKey = prvKey
	jwtService.publicKey = pubKey
	// #endregion setup cypher keys

	// #region setup token durations
	var accessIntDuration = configService.GetIntKey("access-token-duration-in-minutes")
	var refreshIntDuration = configService.GetIntKey("refresh-token-duration-in-hours")

	if accessIntDuration == 0 {
		jwtService.accessTokenDuration = DEFAULT_ACCESS_DURATION
	} else {
		jwtService.accessTokenDuration, err = time.ParseDuration(fmt.Sprintf("%vm", accessIntDuration))
		if err != nil {
			fmthelper.WriteErrorToFMT(err)
			jwtService.accessTokenDuration = DEFAULT_ACCESS_DURATION
		}
	}
	if refreshIntDuration == 0 {
		jwtService.refreshTokenDuration = DEFAULT_REFRESH_DURATION
	} else {
		jwtService.refreshTokenDuration, err = time.ParseDuration(fmt.Sprintf("%vh", refreshIntDuration))
		if err != nil {
			fmthelper.WriteErrorToFMT(err)
			jwtService.refreshTokenDuration = DEFAULT_REFRESH_DURATION
		}
	}
	// #endregion setup token durations

	return jwtService
}

func (j jwtService) Create(ttl time.Duration, content interface{}) (string, error) {
	key, err := jwt.ParseRSAPrivateKeyFromPEM(j.privateKey)
	if err != nil {
		return "", fmt.Errorf("create: parse key: %w", err)
	}
	now := time.Now().UTC()

	claims := make(jwt.MapClaims)
	claims["dat"] = content             // Our custom data.
	claims["exp"] = now.Add(ttl).Unix() // The expiration time after which the token must be disregarded.
	claims["iat"] = now.Unix()          // The time at which the token was issued.
	claims["nbf"] = now.Unix()          // The time before which the token must be disregarded.

	token, err := jwt.NewWithClaims(jwt.SigningMethodRS256, claims).SignedString(key)
	if err != nil {
		return "", fmt.Errorf("create: sign token: %w", err)
	}

	return token, nil
}

func (j jwtService) Validate(token string) (interface{}, error) {
	key, err := jwt.ParseRSAPublicKeyFromPEM(j.publicKey)
	if err != nil {
		return "", fmt.Errorf("validate: parse key: %w", err)
	}

	tok, err := jwt.Parse(token, func(jwtToken *jwt.Token) (interface{}, error) {
		if _, ok := jwtToken.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected method: %s", jwtToken.Header["alg"])
		}

		return key, nil
	})
	if err != nil {
		return nil, fmt.Errorf("validate: %w", err)
	}

	claims, ok := tok.Claims.(jwt.MapClaims)
	if !ok || !tok.Valid {
		return nil, fmt.Errorf("validate: invalid")
	}

	return claims["dat"], nil
}

func (j jwtService) HashString(valueToHash string) (string, error) {
	hasher := sha256.New()
	_, err := hasher.Write([]byte(valueToHash))

	if err != nil {
		return "", err
	}

	hashedValue := base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	return hashedValue, nil
}
func (j jwtService) GenerateSalt() (string, error) {
	salt := make([]byte, 32)
	_, err := io.ReadFull(rand.Reader, salt)
	if err != nil {
		return "", err
	}

	if err != nil {
		return "", err
	}

	return fmt.Sprintf("%x", salt), err
}

func (j jwtService) GenerateTokenDTO(dto functionParameters.GenerateTokenDTO) (models.TokenDTO, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = j.connectionFactory.GetConnection()
	}

	var accessTokenPayload models.AccessTokenPayload
	var refreshTokenPayload models.RefreshTokenPayload

	var returnValue models.TokenDTO

	userRoles, err := j.roleService.GetRolesForUser(functionParameters.GetRoleForUserDTO{
		Context: dto.Context,
		IDUser:  dto.User.ID,
	})
	if err != nil {
		return returnValue, err
	}
	var roleURLs []string
	linq.From(userRoles).Select(func(i interface{}) interface{} {
		return i.(models.Role).Name.Str
	}).ToSlice(&roleURLs)

	accessTokenPayload.IP = dto.Context.GinContext.ClientIP()
	accessTokenPayload.UserID = fmt.Sprintf("%v", dto.User.ID.UUID)
	accessTokenPayload.RoleURLs = strings.Join(roleURLs, ";")

	refreshTokenPayload.ID = fmt.Sprintf("%v", customTypes.RandomValidUUID().UUID)
	refreshTokenPayload.IP = dto.Context.GinContext.ClientIP()
	refreshTokenPayload.IsRefresh = true
	refreshTokenPayload.UserID = fmt.Sprintf("%v", dto.User.ID.UUID)

	//access token
	accessJWT, err := j.Create(j.accessTokenDuration, accessTokenPayload)
	if err != nil {
		return returnValue, err
	}

	returnValue.AccessToken = accessJWT
	returnValue.Roles = userRoles
	returnValue.AccessDurationInSeconds = int(j.accessTokenDuration.Seconds())
	returnValue.RefreshDurationInHours = int(j.refreshTokenDuration.Hours())

	// #region refresh token
	if dto.WithoutRefreshToken.Valid == false || dto.WithoutRefreshToken.BoolValue == false {
		refreshJWT, err := j.Create(j.refreshTokenDuration, refreshTokenPayload)
		if err != nil {
			return returnValue, err
		}
		err = j.SaveRefreshTokenToDB(functionParameters.SaveRefreshTokenToDBDTO{
			Context: dto.Context,
			TokenID: refreshTokenPayload.ID,
			IDUser:  dto.User.ID,
		})
		returnValue.RefreshToken = refreshJWT
	}
	// #endregion refresh token

	return returnValue, err
}
func (service jwtService) ClearRefreshTokens(dto functionParameters.ClearRefreshTokensDTO) error {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	if dto.IDUser.Valid == false {
		return errors.New("Переданы невалидные значения")
	}
	var args = map[string]interface{}{
		"idUser": dto.IDUser,
	}
	var deleteQuery = `delete from atom24.refresh_tokens rTokens where rTokens.id_user = :idUser`
	nstmt, err := conn.PrepareNamed(deleteQuery)
	if err != nil {
		return err
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		return err
	}
	return nil
}
func (service jwtService) ValidateRefreshToken(dto functionParameters.ValidateRefreshTokenDTO) (bool, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	var exists = false
	if dto.IDUser.Valid == false || len(dto.TokenID) < 3 {
		return exists, errors.New("Переданы невалидные значения")
	}
	var args = map[string]interface{}{
		"tokenID": dto.TokenID,
		"idUser":  dto.IDUser,
	}
	var selectQuery = `select exists(select * from atom24.refresh_tokens rTokens where rTokens.s_token_id = :tokenID and id_user = :idUser)`
	nstmt, err := conn.PrepareNamed(selectQuery)
	if err != nil {
		return exists, err
	}
	err = nstmt.Get(&exists, args)
	if err != nil {
		return exists, err
	}
	err = service.ClearRefreshTokens(functionParameters.ClearRefreshTokensDTO{
		Context: dto.Context,
		IDUser:  dto.IDUser,
	})
	if err != nil {
		return exists, err
	}
	return exists, err
}
func (service jwtService) SaveRefreshTokenToDB(dto functionParameters.SaveRefreshTokenToDBDTO) error {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	if dto.IDUser.Valid == false || len(dto.TokenID) < 3 {
		return errors.New("Переданы невалидные значения")
	}
	var args = map[string]interface{}{
		"tokenID": dto.TokenID,
		"idUser":  dto.IDUser,
	}

	err := service.ClearRefreshTokens(functionParameters.ClearRefreshTokensDTO{
		Context: dto.Context,
		IDUser:  dto.IDUser,
	})
	if err != nil {
		return err
	}

	var query = `insert into atom24.refresh_tokens(s_token_id, id_user) values(:tokenID, :idUser)`
	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return err
	}
	_, err = nstmt.Exec(args)
	return err
}
func (service jwtService) ExtractTokenFromContext(dto functionParameters.ExtractTokenFromContext) (customTypes.NullString, error) {
	var returnValue customTypes.NullString
	var ginContext = dto.Context.GinContext

	if ginContext == nil {
		return returnValue, customErrors.NoGinContext
	}

	var headers = ginContext.Request.Header
	var authHeader = headers.Get("Authorization")

	if authHeader == "" {
		return returnValue, errors.New("Не содержит токена авторизации")
	}
	if strings.Contains(authHeader, "Bearer ") == false {
		return returnValue, errors.New("Не содержит токена")
	}

	returnValue.Str = strings.ReplaceAll(authHeader, "Bearer ", "")
	returnValue.Valid = true
	return returnValue, nil
}
func (service jwtService) ExtractTokenPayloadFromContext(dto functionParameters.ExtractTokenPayloadFromContext) (models.AccessTokenPayload, error) {

	var returnValue models.AccessTokenPayload

	stringToken, err := service.ExtractTokenFromContext(functionParameters.ExtractTokenFromContext{
		Context: dto.Context,
	})
	if err != nil {
		return returnValue, err
	}

	result, err := service.Validate(stringToken.Str)
	if err != nil {
		return returnValue, err
	}
	var mapResult = result.(map[string]interface{})

	typehelper.ConvertMapToStructure(mapResult, &returnValue)

	if returnValue.UserID == "" {
		return returnValue, errors.New("Неверные значения в токене")
	}
	return returnValue, nil

}
