package messageController

import (
	_ "atom24/customContext"
	_ "atom24/customTypes"
	"atom24/definitions"
	_ "atom24/definitions/models"
	_ "context"
	_ "encoding/json"
	_ "mime/multipart"
	"net/http"
	_ "strings"

	_ "github.com/google/uuid"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

var userService definitions.UserService
var connectionFactory definitions.ConnectionFactory
var blockService definitions.BlockingService

func InitializeMessageController(router *gin.RouterGroup, container *dig.Container) error {
	router.GET("/send", sendMessageMail)

	err := container.Invoke(func(us definitions.UserService,
		cf definitions.ConnectionFactory,
		bs definitions.BlockingService) {

		userService = us
		connectionFactory = cf
		blockService = bs
	})
	if err != nil {
		return err
	}

	return nil
}

func sendMessageMail(context *gin.Context) {

	status, err := userService.SendMail()
	if err != nil {
		panic(err)
	}
	context.JSON(http.StatusOK, status)

}
