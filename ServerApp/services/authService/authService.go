package authService

import (
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/globalConstants"
	"atom24/definitions/models"
	"atom24/helpers/typehelper"
	"errors"
	"fmt"
	"strings"

	"github.com/gin-gonic/gin"
)

type authService struct {
	jwtService definitions.JWTService
	logger     definitions.Logger
}

func ProvideAuthService(jwtServiceLocal definitions.JWTService, lg definitions.Logger) definitions.AuthService {
	var authService authService
	authService.jwtService = jwtServiceLocal
	authService.logger = lg
	return authService
}
func (service authService) AuthorizeIfTokenExists() gin.HandlerFunc {
	return func(c *gin.Context) {
		// aborts connection itself
		var token = service.ExtractPayload(c)
		if token.UserID == "" {
			return
		}
		c.Next()
	}
}
func (service authService) AuthorizeByRole(role string) gin.HandlerFunc {
	return func(c *gin.Context) {

		var token = service.ExtractPayload(c)
		if token.UserID == "" {
			return
		}

		var contains = false
		for _, roleURL := range strings.Split(token.RoleURLs, ";") {
			if roleURL == role {
				contains = true
			}
		}
		if contains == false {
			c.AbortWithStatus(401)
		}
		c.Next()
	}
}
func (service authService) ExtractPayload(c *gin.Context) models.AccessTokenPayload {
	var headers = c.Request.Header
	var authHeader = headers.Get("Authorization")

	var returnValue models.AccessTokenPayload

	if authHeader == "" {
		c.AbortWithStatus(401)
		return returnValue
	}
	if strings.Contains(authHeader, "Bearer ") == false {
		c.AbortWithStatus(400)
		return returnValue
	}

	var stringToken = strings.ReplaceAll(authHeader, "Bearer ", "")

	result, err := service.jwtService.Validate(stringToken)
	if err != nil {
		service.logger.Log(functionParameters.LogDTO{
			LogLevel: globalConstants.LOG_LEVEL_ERROR,
			Message: models.LogMessage{
				Message: customTypes.ValidString(fmt.Sprintf("AuthorizeByApplicationStartingURL error: %v", err)),
			},
		})
		c.AbortWithStatus(500)
		return returnValue
	}
	var mapResult = result.(map[string]interface{})

	typehelper.ConvertMapToStructure(mapResult, &returnValue)

	var clientIP = c.ClientIP()

	var isLocalClient = clientIP == "::1" || clientIP == "127.0.0.1"
	var isLocalToken = returnValue.IP == "::1" || returnValue.IP == "127.0.0.1"

	if isLocalClient && isLocalToken {
		// если токен выдан локальному пользователю, пропускать
	} else if returnValue.IP != clientIP {
		c.AbortWithError(401, errors.New(fmt.Sprintf("Token issued for another IP address, %v - %v ", returnValue.IP, clientIP)))
		return returnValue
	}
	return returnValue
}
