package jwtService

import (
	"atom24/definitions"
	"atom24/factories"
	"atom24/services/configService"
	"atom24/services/roleService"
	"strings"
	"testing"
	"time"

	"go.uber.org/dig"
)

var service definitions.JWTService

func InitializeTest() error {
	container := dig.New()

	container.Provide(factories.ProvideConnectionFactory)
	container.Provide(configService.ProvideConfigurationServiceForTesting)
	container.Provide(roleService.ProvideRoleService)
	err := container.Invoke(func(configService definitions.ConfigService,
		cf definitions.ConnectionFactory,
		rs definitions.RoleService) {
		service = ProvideJWTService(configService, cf, rs)

	})
	return err
}
func TestJWTService(t *testing.T) {

	err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}

	var testContent = map[string]interface{}{
		"user":  "test",
		"roles": "testRoles",
	}

	t.Run("testing expired token", func(t *testing.T) {
		token, err := service.Create(time.Second*-1, testContent)
		if err != nil {
			t.Errorf("Got error from .Create(): %v", err)
		}
		_, err = service.Validate(token)
		if err == nil {
			t.Errorf("expired token should throw error")
		}
		if strings.Contains(err.Error(), "Token is expired") == false {
			t.Errorf("wrong error : '\"%v\", should be \"Token is expired\"", err)
		}
	})
	t.Run("testing live token", func(t *testing.T) {
		token, err := service.Create(time.Second, testContent)
		if err != nil {
			t.Errorf("Got error from .Create(): %v", err)
		}
		time.Sleep(time.Microsecond)
		result, err := service.Validate(token)
		if err != nil {
			t.Errorf("Got error from .Create(): %v", err)
		}

		var mapResult = result.(map[string]interface{})

		if mapResult["user"] != "test" || mapResult["roles"] != "testRoles" {
			t.Errorf("Wrong output: %v, expected %v", result, testContent)
		}
	})
}
