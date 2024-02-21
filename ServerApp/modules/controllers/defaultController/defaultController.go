package defaultController

import (
	"atom24/customContext"
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/globalConstants"
	"atom24/definitions/models"
	"atom24/helpers/typehelper"
	"fmt"
	"net/http"

	"github.com/google/uuid"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

var connectionFactory definitions.ConnectionFactory
var logger definitions.Logger
var userService definitions.UserService
var blockService definitions.BlockingService
var jwtService definitions.JWTService
var configService definitions.ConfigService

func InitializeDefaultController(router *gin.RouterGroup, container *dig.Container) error {
	router.POST("/getToken", getToken)
	router.POST("/refreshToken", refreshToken)
	router.POST("/log", logValue)
	router.GET("/navigationButtons/:role", getNavigationButtons)
	router.POST("/blockObject/:id", blockObject)
	router.POST("/unblockObject/:id", unblockObject)
	/*
		router.POST("/blockSeveralObjects", blockSeveralObjects)
		router.POST("/unblockSeveralObjects", unblockSeveralObjects)
		router.GET("/modules", getModules)
		router.GET("/image/:uuid", getImage)
		router.GET("/testRoleAccess", testRolesAccess) */
	err := container.Invoke(func(c definitions.ConnectionFactory,
		l definitions.Logger,
		us definitions.UserService,
		jwt definitions.JWTService,
		bs definitions.BlockingService,
		cs definitions.ConfigService) {
		connectionFactory = c
		logger = l
		userService = us
		jwtService = jwt
		blockService = bs
		configService = cs
	})
	if err != nil {
		return err
	}

	return err
}

func refreshToken(c *gin.Context) {
	dto := struct {
		RefreshToken customTypes.NullString `json:"refreshToken"`
	}{}
	err := c.BindJSON(&dto)
	if err != nil {
		panic(err)
	}
	if dto.RefreshToken.Valid == false {
		c.JSON(432, "пустой refreshToken")
		return
	}
	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		panic(err)
	}
	// вытаскиваем Payload
	tokenPayload, err := jwtService.Validate(dto.RefreshToken.Str)
	if err != nil {
		panic(err)
	}
	var tokenMap = tokenPayload.(map[string]interface{})
	var token models.RefreshTokenPayload
	typehelper.ConvertMapToStructure(tokenMap, &token)

	var userID uuid.UUID
	err = userID.UnmarshalText([]byte(token.UserID))
	if err != nil {
		tx.Rollback()
		panic(err)
	}

	// Проверяем, есть ли запись в базе
	shouldContinue, err := jwtService.ValidateRefreshToken(functionParameters.ValidateRefreshTokenDTO{
		Context: customContext.Context{Connection: tx},
		TokenID: token.ID,
		IDUser:  customTypes.ValidUUID(userID),
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	if shouldContinue == false {
		tx.Rollback()
		c.JSON(432, "Токен уже был использован")
		return
	}
	var ip = c.ClientIP()
	if token.IP != ip {
		tx.Rollback()
		c.JSON(432, "Токен был выдан на другой IP-адрес")
		return
	}
	if token.IsRefresh != true {
		tx.Rollback()
		c.JSON(432, "Не является refresh токеном")
		return
	}
	// генерируем новую пару
	user, err := userService.GetUser(functionParameters.GetUsersDTO{
		ID: customTypes.ValidUUID(userID),
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	if user.ID.Valid == false {
		tx.Rollback()
		c.JSON(432, "Не найдено такого пользователя")
		return
	}
	tokenDTO, err := jwtService.GenerateTokenDTO(functionParameters.GenerateTokenDTO{
		Context: customContext.Context{GinContext: c, Connection: tx},
		User:    user,
	})

	if err != nil {
		tx.Rollback()
		panic(err)
	}
	err = tx.Commit()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, tokenDTO)
}
func getToken(c *gin.Context) {
	var ip = c.ClientIP()
	var ip2 = c.RemoteIP()
	fmt.Println(ip, ip2)
	authenticator := struct {
		Login    customTypes.NullString `json:"login"`
		Password customTypes.NullString `json:"password"`
	}{}
	c.BindJSON(&authenticator)

	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	var myContext = customContext.Context{GinContext: c, Connection: tx}
	user, userErr, err := userService.AuthenticateUser(functionParameters.AuthenticateUserDTO{
		Context:  myContext,
		Login:    authenticator.Login,
		Password: authenticator.Password,
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	if userErr != nil {
		tx.Rollback()
		c.JSON(432, userErr.Error())
		return
	}
	if user.ID.Valid == false {
		tx.Rollback()
		c.JSON(432, "Неверная пара логин/пароль")
		return
	}
	tokenDTO, err := jwtService.GenerateTokenDTO(functionParameters.GenerateTokenDTO{
		Context: myContext,
		User:    user,
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}

	err = tx.Commit()

	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, tokenDTO)
}

func getNavigationButtons(context *gin.Context) {
	var navigationButtons []models.NavigationButton

	var navigationButton models.NavigationButton

	var name = context.Param("role")
	if name == "admin" {
		navigationButton.Caption = "Пользователи"
		navigationButton.IconClass = "person"
		navigationButton.RouterLink = "admin/users"
		navigationButtons = append(navigationButtons, navigationButton)
	}

	if name == "user" {

		navigationButton.Caption = "Мои права"
		navigationButton.IconClass = "Folder_Shared"
		navigationButton.RouterLink = "user/myroles"
		navigationButtons = append(navigationButtons, navigationButton)

		navigationButton.Caption = "Мои заявки"
		navigationButton.IconClass = "News"
		navigationButton.RouterLink = "user/myapplications"
		navigationButtons = append(navigationButtons, navigationButton)

		navigationButton.Caption = "Новая заявка"
		navigationButton.IconClass = "Add_To_Drive"
		navigationButton.RouterLink = "user/newapplication"
		navigationButtons = append(navigationButtons, navigationButton)

	}

	if name == "confirmer" {
		navigationButton.Caption = "Заявки"
		navigationButton.IconClass = "Folder_Open"
		navigationButton.RouterLink = "confirmer/applications"
		navigationButtons = append(navigationButtons, navigationButton)

		navigationButton.Caption = "Аналитика"
		navigationButton.IconClass = "Finance"
		navigationButton.RouterLink = "confirmer/analytics"
		navigationButtons = append(navigationButtons, navigationButton)
	}
	context.JSON(http.StatusOK, navigationButtons)
}

func logValue(c *gin.Context) {
	logDTO := models.FrontError{}
	err := c.BindJSON(&logDTO)
	if err != nil {
		panic(err)
	}

	var errorMessage = models.LogMessage{}

	user, err := userService.GetUserFromContext(functionParameters.GetUserFromContextDTO{Context: customContext.Context{GinContext: c}})
	if err != nil {
		errorMessage.Message = customTypes.ValidString(err.Error())
		logger.Log(functionParameters.LogDTO{
			LogLevel: globalConstants.LOG_LEVEL_ERROR,
			Message:  errorMessage,
		})
		return
	} else {
		errorMessage.UserLogin = user.Login
	}

	errorMessage.Message = customTypes.ValidString(logDTO.Message)

	logParam := functionParameters.LogDTO{
		LogLevel: logDTO.Level,
		Message:  errorMessage,
	}
	logger.Log(logParam)
	c.IndentedJSON(http.StatusOK, true)
}

func blockObject(c *gin.Context) {
	var stringID = c.Param("id")
	var id uuid.UUID

	err := id.UnmarshalText([]byte(stringID))
	if err != nil {
		panic(err)
	}

	userError, err := blockService.BlockObject(functionParameters.BlockUnblockObjectDTO{
		Context:  customContext.Context{GinContext: c},
		ObjectID: customTypes.ValidUUID(id),
	})
	if err != nil {
		panic(err)
	}
	if userError != nil {
		c.JSON(432, userError.Error())
		return
	}
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, "")
}
func unblockObject(c *gin.Context) {
	var stringID = c.Param("id")
	var id uuid.UUID

	err := id.UnmarshalText([]byte(stringID))
	if err != nil {
		panic(err)
	}

	userError, err := blockService.UnblockObject(functionParameters.BlockUnblockObjectDTO{
		Context:  customContext.Context{GinContext: c},
		ObjectID: customTypes.ValidUUID(id),
	})
	if err != nil {
		panic(err)
	}
	if userError != nil {
		c.JSON(432, userError.Error())
	}
	c.JSON(http.StatusOK, "")
}
