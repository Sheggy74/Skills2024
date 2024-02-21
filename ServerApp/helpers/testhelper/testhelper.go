package testhelper

import (
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetContextWithBearerToken(dto functionParameters.GetContextWithBearerTokenDTO) (*gin.Context, error) {
	var userService definitions.UserService
	var jwtService definitions.JWTService
	var err = dto.Container.Invoke(func(us definitions.UserService, jwt definitions.JWTService) {
		userService = us
		jwtService = jwt
	})

	if err != nil {
		return nil, err
	}
	user, err := userService.GetUser(functionParameters.GetUsersDTO{
		Context: dto.Context,
		ID:      dto.UserID,
	})
	if err != nil {
		return nil, err
	}
	token, err := jwtService.Create(time.Minute, models.AccessTokenPayload{
		UserID: user.ID.UUID.String(),
	})
	if err != nil {
		return nil, err
	}
	var header = http.Header{}
	header.Set("Authorization", "Bearer "+token)

	return &gin.Context{Request: &http.Request{Header: header}}, err
}
func GetContextWithBearerTokenForRandomUser(dto functionParameters.GetContextWithBearerTokenDTO) (*gin.Context, error) {
	var userService definitions.UserService
	var err = dto.Container.Invoke(func(us definitions.UserService, jwt definitions.JWTService) {
		userService = us
	})

	if err != nil {
		return nil, err
	}
	users, err := userService.GetUsers(functionParameters.GetUsersDTO{
		Context: dto.Context,
	})
	dto.UserID = users[0].ID
	return GetContextWithBearerToken(dto)
}
func GetContextWithBearerTokenForAdministrator(dto functionParameters.GetContextWithBearerTokenDTO) (*gin.Context, error) {
	var connectionFactory definitions.ConnectionFactory
	var err = dto.Container.Invoke(func(us definitions.UserService, jwt definitions.JWTService, cf definitions.ConnectionFactory) {
		connectionFactory = cf
	})
	if err != nil {
		return nil, err
	}
	var userID uuid.NullUUID

	var query = `select 
						users.id
							from atom24.users users 
								inner join atom24.users_roles uRoles on uRoles.id_user = users.id
								inner join atom24.roles roles on roles.id = uRoles.id_role
								where roles.s_name = 'Administrator'
								limit 1`

	nstmt, err := connectionFactory.GetConnection().PrepareNamed(query)
	if err != nil {
		return nil, err
	}
	err = nstmt.Get(&userID, map[string]interface{}{})
	if err != nil {
		return nil, err
	}
	dto.UserID = userID
	return GetContextWithBearerToken(dto)
}
