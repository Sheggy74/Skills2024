package admin

import (
	"atom24/modules/admin/controllers/userController"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

func InitializeAdminModule(router *gin.RouterGroup, container *dig.Container) error {
	var userGroup = router.Group("users")

	err := userController.InitializeUserController(userGroup, container)
	if err != nil {
		return err
	}

	return nil
}
