package userController

import (
	"atom24/customContext"
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"context"
	"encoding/json"
	"mime/multipart"
	"net/http"
	"strings"

	"github.com/google/uuid"

	"github.com/gin-gonic/gin"
	"go.uber.org/dig"
)

var userService definitions.UserService
var connectionFactory definitions.ConnectionFactory
var blockService definitions.BlockingService

func InitializeUserController(router *gin.RouterGroup, container *dig.Container) error {
	router.GET("/", getUsers)
	router.POST("create", createUser)
	router.POST("update", updateUser)
	router.DELETE("delete/:id", deleteUser)

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

func getUsers(context *gin.Context) {
	users, err := userService.GetUsers(functionParameters.GetUsersDTO{})
	if err != nil {
		panic(err)
	}
	context.JSON(http.StatusOK, users)
}

func createUser(c *gin.Context) {
	var loadFileString = c.PostForm("loadFile")
	var password = c.PostForm("password")
	var err error
	var file *multipart.FileHeader
	if loadFileString == "true" {
		file, err = c.FormFile("photo")
		if err != nil {
			panic(err)
		}
	}
	var userString = c.PostForm("user")

	var user models.User
	err = json.Unmarshal([]byte(userString), &user)
	if err != nil {
		panic(err)
	}

	var ctx = context.TODO()
	var conn = connectionFactory.GetConnection()
	tx, err := conn.BeginTxx(ctx, nil)
	if err != nil {
		panic(err)
	}

	newUser, err := userService.CreateUser(functionParameters.CreateOrUpdateUserDTO{
		Context: customContext.Context{
			Connection: tx,
			GinContext: c,
		},
		User: user,
		File: file,
		Password: customTypes.NullString{
			Str:   strings.Trim(password, " "),
			Valid: len(strings.Trim(password, " ")) > 3,
		},
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	err = tx.Commit()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, newUser)

}

func updateUser(c *gin.Context) {
	//#region extract body
	var loadFileString = c.PostForm("loadFile")
	var password = c.PostForm("password")
	var err error
	var file *multipart.FileHeader
	if loadFileString == "true" {
		file, err = c.FormFile("photo")
		if err != nil {
			panic(err)
		}
	}
	var userString = c.PostForm("user")

	var user models.User
	err = json.Unmarshal([]byte(userString), &user)
	if err != nil {
		panic(err)
	}
	//#endregion

	var ctx = context.TODO()
	var conn = connectionFactory.GetConnection()
	tx, err := conn.BeginTxx(ctx, nil)
	if err != nil {
		panic(err)
	}

	//#region blockchecks
	visibleErr, err := blockService.CanEditWithBlocking(functionParameters.BlockUnblockObjectDTO{
		Context:  customContext.Context{GinContext: c},
		ObjectID: user.ID,
	})
	if err != nil {
		panic(err)
	}
	if visibleErr != nil {
		c.JSON(432, visibleErr.Error())
		return
	}
	//#endregion blockchecks

	newUser, err := userService.UpdateUser(functionParameters.CreateOrUpdateUserDTO{
		Context: customContext.Context{
			Connection: tx,
		},
		User: user,
		File: file,
		Password: customTypes.NullString{
			Str:   strings.Trim(password, " "),
			Valid: len(strings.Trim(password, " ")) > 3,
		},
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	err = tx.Commit()
	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, newUser)

}

func deleteUser(c *gin.Context) {
	var stringID = c.Param("id")
	var id uuid.UUID

	err := id.UnmarshalText([]byte(stringID))
	if err != nil {
		panic(err)
	}

	//#region blockchecks
	visibleErr, err := blockService.CanEditWithBlocking(functionParameters.BlockUnblockObjectDTO{
		Context:  customContext.Context{GinContext: c},
		ObjectID: customTypes.ValidUUID(id),
	})
	if err != nil {
		panic(err)
	}
	if visibleErr != nil {
		c.JSON(432, visibleErr.Error())
		return
	}
	//#endregion blockchecks

	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		panic(err)
	}

	result, err := userService.CanDeleteUser(functionParameters.CanDeleteUserDTO{
		Context: customContext.Context{Connection: tx},
		ID:      customTypes.ValidUUID(id),
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	if result != "" {
		tx.Rollback()
		c.JSON(432, result)
		return
	}

	err = userService.DeleteUser(functionParameters.DeleteUserDTO{
		Context: customContext.Context{Connection: tx},
		ID:      customTypes.ValidUUID(id),
	})
	if err != nil {
		tx.Rollback()
		panic(err)
	}
	err = tx.Commit()
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, true)
}
