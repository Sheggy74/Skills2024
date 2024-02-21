package userService

import (
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/customErrors"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"bytes"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"errors"
	"net/smtp"
	"strings"
	"time"

	"github.com/google/uuid"
)

type userService struct {
	connectionFactory definitions.ConnectionFactory
	jwtService        definitions.JWTService
	configService     definitions.ConfigService
	logger            definitions.Logger
	keyValueService   definitions.KeyValueService
	bDataService      definitions.BDataService
}

func ProvideUserService(cf definitions.ConnectionFactory,
	jwt definitions.JWTService,
	conf definitions.ConfigService,
	lg definitions.Logger,
	kvs definitions.KeyValueService,
	bds definitions.BDataService) definitions.UserService {

	var userService userService
	userService.connectionFactory = cf
	userService.jwtService = jwt
	userService.configService = conf
	userService.logger = lg
	userService.keyValueService = kvs
	userService.bDataService = bds

	return userService
}
func (service userService) GetUserFromContext(dto functionParameters.GetUserFromContextDTO) (models.User, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	var returnValue models.User

	accessTokenString, err := service.jwtService.ExtractTokenFromContext(functionParameters.ExtractTokenFromContext{
		Context: dto.Context,
	})
	if err != nil {
		return returnValue, err
	}

	// Забираем сохранённого если есть
	userJSON, err := service.keyValueService.GetValue(accessTokenString.Str)
	if err != nil {
		return returnValue, err
	}
	if userJSON.Valid {
		err = json.Unmarshal([]byte(userJSON.Str), &returnValue)
		return returnValue, err
	}

	// если нет, берём из базы и создаём заново
	accessTokenPayload, err := service.jwtService.ExtractTokenPayloadFromContext(functionParameters.ExtractTokenPayloadFromContext{
		Context: dto.Context,
	})
	if err != nil {
		return returnValue, err
	}
	var userID uuid.NullUUID
	err = userID.UnmarshalText([]byte(accessTokenPayload.UserID))
	if err != nil {
		return returnValue, err
	}
	returnValue, err = service.GetUser(functionParameters.GetUsersDTO{
		Context: dto.Context,
		ID:      userID,
	})

	jsonValue, err := json.Marshal(returnValue)
	if err != nil {
		return returnValue, err
	}

	err = service.keyValueService.SetKeyWithExpiration(accessTokenString.Str, string(jsonValue), time.Minute*10)

	return returnValue, err
}

func (service userService) SendMail() (string, error) {

	emailServer := "cgateserv.local.imf.ru:25"
	address := "02334446@local.imf.ru"

	//подключением
	c, err := smtp.Dial(emailServer)
	defer c.Close()
	if err != nil {
		return "", err
	}

	//отправитель
	if err := c.Mail("no-reply@local.imf.ru"); err != nil {
		return "", err
	}
	//получатель
	if err := c.Rcpt(address); err != nil {
		return "", err
	}
	//тело письма
	wc, err := c.Data()
	if err != nil {
		return "", err
	}
	defer wc.Close()

	var messageBody = "<h1>Hello there</h1><p>General Kenobi</p>"

	var wholeMessage = `To: ` + address + "\r\n" +
		`From: ` + "no-reply@local.imf.ru" + "\r\n" +
		`Subject: ` + "test subject" + "\r\n" +
		`Content-Type: ` + `text/html; charset="UTF-8"` + "\r\n" +
		`Content-Transfer-Encoding: ` + "base64" + "\r\n" +
		"\r\n" + base64.StdEncoding.EncodeToString([]byte(messageBody))

	buf := bytes.NewBufferString(wholeMessage)
	_, err = buf.WriteTo(wc)
	if err != nil {
		return "", err
	}
	err = c.Quit()

	return err.Error(), nil
}

func (service userService) GetUser(dto functionParameters.GetUsersDTO) (models.User, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	result, err := service.GetUsers(dto)
	if err != nil {
		return models.User{}, err
	}
	if len(result) > 1 {
		return models.User{}, customErrors.ErrTooManyRows
	}
	if len(result) == 0 {
		return models.User{}, nil
	}
	return result[0], nil
}
func (service userService) GetUsers(dto functionParameters.GetUsersDTO) ([]models.User, error) {
	var returnValues []models.User

	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	args := map[string]interface{}{}

	var query = `select
						users.*
						from atom24.users users
						where 1=1
		`

	if dto.ID.Valid {
		query += " and users.id = :id"
		args["id"] = dto.ID
	}
	if dto.Login.Valid {
		query += " and users.s_login = :login"
		args["login"] = dto.Login
	}

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return returnValues, err
	}
	err = nstmt.Select(&returnValues, args)
	if err != nil {
		return returnValues, err
	}
	if err == sql.ErrNoRows {
		return returnValues, nil
	}
	return returnValues, nil
}
func (service userService) CanDeleteUser(dto functionParameters.CanDeleteUserDTO) (string, error) {

	var returnMessage string
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	if dto.ID.Valid == false {
		return returnMessage, errors.New("Invalid ID")
	}
	var hasRoles = false

	var query2 = ` select exists (select * from atom24.users_roles where id_user = :id) `
	var args = map[string]interface{}{
		"id": dto.ID,
	}
	nstmt, err := conn.PrepareNamed(query2)
	if err != nil {
		return returnMessage, err
	}
	err = nstmt.Get(&hasRoles, args)
	if err != nil {
		return returnMessage, err
	}
	if hasRoles {
		returnMessage = returnMessage + "За пользователем закреплены роли.\n"
	}
	if returnMessage != "" {
		returnMessage = returnMessage + "Удаление невозможно"
	}
	return returnMessage, err
}
func (service userService) DeleteUser(dto functionParameters.DeleteUserDTO) error {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	if dto.ID.Valid == false {
		return errors.New("Invalid ID")
	}

	var args = map[string]interface{}{
		"id": dto.ID,
	}
	// clearing tokens associated with user
	err := service.jwtService.ClearRefreshTokens(functionParameters.ClearRefreshTokensDTO{
		Context: dto.Context,
		IDUser:  dto.ID,
	})
	if err != nil {
		return err
	}

	var query = ` delete from atom24.users users where users.id = :id`
	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return err
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		return err
	}
	return nil
}
func (service userService) CreateUser(dto functionParameters.CreateOrUpdateUserDTO) (models.User, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var returnValue models.User
	var newID uuid.NullUUID

	var password customTypes.NullString
	var salt customTypes.NullString
	var idPhoto uuid.NullUUID

	if dto.Password.Valid {
		localSalt, err := service.jwtService.GenerateSalt()
		if err != nil {
			return models.User{}, err
		}
		passwordHash, err := service.jwtService.HashString(dto.Password.Str + localSalt)
		if err != nil {
			return models.User{}, err
		}
		salt = customTypes.ValidString(localSalt)
		password = customTypes.ValidString(passwordHash)
	}
	if dto.File != nil {
		var id = uuid.New()
		idPhoto = customTypes.ValidUUID(id)

		err := service.bDataService.UploadFile(functionParameters.UploadFileDTO{
			Context: dto.Context,
			ID:      customTypes.ValidUUID(id),
			File:    dto.File,
		})

		if err != nil {
			return returnValue, err
		}
	}

	var query = ` insert into atom24.users(s_login, s_password_hash, s_salt, s_first_name, s_second_name, s_last_name, id_photo)
					values(:login, :passwordHash, :salt, :firstName, :secondName, :lastName, :idPhoto) returning id
						`
	var args = map[string]interface{}{
		"login":        dto.User.Login,
		"firstName":    dto.User.FirstName,
		"secondName":   dto.User.SecondName,
		"lastName":     dto.User.LastName,
		"passwordHash": password,
		"salt":         salt,
		"idPhoto":      idPhoto,
	}

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return returnValue, err
	}
	err = nstmt.Get(&newID, args)
	if err != nil {
		return returnValue, err
	}

	returnValue, err = service.GetUser(functionParameters.GetUsersDTO{
		Context: dto.Context,
		ID:      newID,
	})
	return returnValue, err
}
func (service userService) AuthenticateByLoginPassword(dto functionParameters.AuthenticateByLoginPasswordDTO) (bool, error) {
	if dto.User.ID.Valid == false {
		return false, errors.New("Невалидные входные значения")
	}
	if dto.User.PasswordHash.Valid == false {
		return false, nil
	}

	hash, err := service.jwtService.HashString(dto.Password.Str + dto.User.Salt.Str)
	if err != nil {
		return false, err
	}
	if hash != dto.User.PasswordHash.Str {
		return false, nil
	}
	return true, nil
}
func (service userService) AuthenticateUser(dto functionParameters.AuthenticateUserDTO) (models.User, error, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var returnValue models.User

	user, err := service.GetUser(functionParameters.GetUsersDTO{
		Login: dto.Login,
	})

	// creating new domain user if not exists
	if user.ID.Valid == false {
		user, err = service.CreateUser(functionParameters.CreateOrUpdateUserDTO{
			Context: dto.Context,
			User: models.User{
				Login: dto.Login,
			},
		})
		if err != nil {
			return returnValue, nil, err
		}
	}
	if user.ID.Valid == false {
		return returnValue, customErrors.ErrWrongLoginPassword, nil
	}
	byPassword, err := service.AuthenticateByLoginPassword(functionParameters.AuthenticateByLoginPasswordDTO{
		Context:  dto.Context,
		User:     user,
		Login:    dto.Login,
		Password: dto.Password,
	})
	if err != nil {
		return returnValue, nil, err
	}

	if byPassword == false {
		return returnValue, nil, nil
	}

	returnValue = user
	return returnValue, nil, nil
}
func (service userService) UpdateUser(dto functionParameters.CreateOrUpdateUserDTO) (models.User, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var returnValue models.User

	var idPhoto uuid.NullUUID
	var password customTypes.NullString
	var salt customTypes.NullString
	if dto.User.ID.Valid == false {
		return returnValue, errors.New("Невалидный идентификатор")
	}

	var query = ` update atom24.users set s_login = :login, 
										--update-password
										--update-photo
										s_first_name = :firstName, 
										s_second_name = :secondName,
										s_last_name = :lastName
									where id = :id
		`
	if dto.Password.Valid {
		localSalt, err := service.jwtService.GenerateSalt()
		if err != nil {
			return models.User{}, err
		}
		passwordHash, err := service.jwtService.HashString(dto.Password.Str + localSalt)
		if err != nil {
			return models.User{}, err
		}
		salt = customTypes.ValidString(localSalt)
		password = customTypes.ValidString(passwordHash)
		query = strings.ReplaceAll(query, "--update-password", "s_password_hash = :passwordHash, s_salt = :salt,")
	}
	if dto.File != nil {
		var id = uuid.New()
		idPhoto = customTypes.ValidUUID(id)

		err := service.bDataService.UploadFile(functionParameters.UploadFileDTO{
			Context: dto.Context,
			ID:      customTypes.ValidUUID(id),
			File:    dto.File,
		})

		if err != nil {
			return returnValue, err
		}
		query = strings.ReplaceAll(query, "--update-photo", "id_photo = :idPhoto,")
	}
	var args = map[string]interface{}{
		"id":           dto.User.ID,
		"login":        dto.User.Login,
		"firstName":    dto.User.FirstName,
		"secondName":   dto.User.SecondName,
		"lastName":     dto.User.LastName,
		"passwordHash": password,
		"salt":         salt,
		"idPhoto":      idPhoto,
	}

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return returnValue, err
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		return returnValue, err
	}

	returnValue, err = service.GetUser(functionParameters.GetUsersDTO{
		Context: dto.Context,
		ID:      dto.User.ID,
	})
	return returnValue, err
}
