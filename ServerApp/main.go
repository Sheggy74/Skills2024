package main

import (
	"atom24/customContext"
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/globalConstants"
	"atom24/definitions/models"
	"atom24/factories"
	"atom24/helpers/fmthelper"
	"atom24/modules/admin"
	"atom24/modules/admin/controllers/messageController"
	"atom24/modules/controllers/defaultController"
	"atom24/services/authService"
	"atom24/services/bDataService"
	"atom24/services/blockingService"
	"atom24/services/configService"
	"atom24/services/jwtService"
	"atom24/services/keyValueService"
	"atom24/services/logService"
	"atom24/services/roleService"
	"atom24/services/userService"
	"fmt"
	_ "net/http"
	"runtime"
	"runtime/debug"
	"time"

	"github.com/gin-gonic/gin"

	/* . "github.com/ahmetb/go-linq/v3" */
	_ "github.com/gin-gonic/gin"

	/* "github.com/olivere/dapper" */
	// SQLX guide - https://jmoiron.github.io/sqlx/
	"go.uber.org/dig"
)

var logger definitions.Logger
var userServiceLocal definitions.UserService
var configServiceTest definitions.ConfigService

func main() {
	_, err := time.LoadLocation("Europe/Budapest")

	// Инициализация зависимостей
	runtime.GOMAXPROCS(4)
	container := InitializeContainer()

	err = container.Invoke(func(lg definitions.Logger,
		us definitions.UserService,
		cs definitions.ConfigService) {
		logger = lg
		userServiceLocal = us
		configServiceTest = cs
	})
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
		fmt.Scanln()
	}
	router := gin.Default()

	//middleware
	router.Use(CORSMiddleware())
	router.Use(gin.CustomRecovery(
		func(c *gin.Context, err any) {
			handleBackendPanic(c, err)
		},
	))
	// controller initialization
	err = InitializeControllers(router, container)
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
		fmt.Scanln()
	}

	var config definitions.ConfigService
	container.Invoke(func(configService definitions.ConfigService, keyValueService definitions.KeyValueService) {
		config = configService
	})

	err = router.Run(config.GetStringKey("host") + ":" + config.GetStringKey("port"))
	if err != nil {
		fmthelper.WriteErrorToFMT(err)
	}

}
func handleBackendPanic(c *gin.Context, err any) {
	user, errLocal := userServiceLocal.GetUserFromContext(functionParameters.GetUserFromContextDTO{Context: customContext.Context{GinContext: c}})
	if errLocal != nil {
		logger.Log(functionParameters.LogDTO{
			LogLevel: globalConstants.LOG_LEVEL_ERROR,
			Message: models.LogMessage{
				Message: customTypes.ValidString(errLocal.Error()),
			},
		})
		return
	}

	if errLocal != nil {
		logger.Log(functionParameters.LogDTO{
			LogLevel: globalConstants.LOG_LEVEL_ERROR,
			Message: models.LogMessage{
				Message: customTypes.ValidString(errLocal.Error()),
			},
		})
	} else {
		logger.Log(functionParameters.LogDTO{
			LogLevel: globalConstants.LOG_LEVEL_ERROR,
			Message: models.LogMessage{
				UserLogin: user.Login,
				Message:   customTypes.ValidString(fmt.Sprintf("%v", err)),
				Stack:     customTypes.ValidString(string(debug.Stack())),
			},
		})
	}

	c.AbortWithStatus(500)
}
func InitializeControllers(router *gin.Engine, container *dig.Container) error {
	var authService definitions.AuthService

	container.Invoke(func(as definitions.AuthService) {
		authService = as
	})

	var adminGroup = router.Group("admin")
	adminGroup.Use(authService.AuthorizeByRole("administrator"))

	var defaultGroup = router.Group("default")

	var messageGroup = router.Group("message")
	messageGroup.Use(authService.AuthorizeByRole("administrator"))

	admin.InitializeAdminModule(adminGroup, container)
	messageController.InitializeMessageController(messageGroup, container)
	defaultController.InitializeDefaultController(defaultGroup, container)

	return nil
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		var value = c.Request.Header.Get("Access-Control-Allow-Origin")
		if value != "*" {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		}
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(200)
			return
		}

		c.Next()
	}
}
func InitializeContainer() *dig.Container {
	container := dig.New()
	//проинициализировать контейнер
	ProvideGlobalServices(container)
	return container
}
func ProvideGlobalServices(container *dig.Container) {
	container.Provide(factories.ProvideConnectionFactory)
	container.Provide(userService.ProvideUserService)
	container.Provide(blockingService.ProvideBlockingService)
	container.Provide(bDataService.ProvideBDataService)
	container.Provide(logService.ProvideLogger)
	container.Provide(jwtService.ProvideJWTService)
	container.Provide(roleService.ProvideRoleService)
	container.Provide(authService.ProvideAuthService)
	container.Provide(keyValueService.ProvideKeyValueService)
	container.Provide(configService.ProvideConfigurationService)
}
