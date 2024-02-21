package blockingService

import (
	"atom24/customContext"
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/customErrors"
	"atom24/definitions/functionParameters"
	"atom24/factories"
	"atom24/helpers/testhelper"
	"atom24/services/jwtService"
	"atom24/services/keyValueService"
	"atom24/services/logService"
	"atom24/services/userService"
	"errors"
	"strings"
	"testing"

	"github.com/google/uuid"

	"github.com/jmoiron/sqlx"

	"go.uber.org/dig"
)

var blockingServiceTest definitions.BlockingService
var connectionFactory definitions.ConnectionFactory
var userServiceTest definitions.UserService

func InitializeTest() (*dig.Container, error) {
	container := dig.New()

	container.Provide(factories.ProvideConnectionFactory)
	container.Provide(jwtService.ProvideJWTService)
	container.Provide(logService.ProvideLogger)
	container.Provide(userService.ProvideUserService)
	container.Provide(keyValueService.ProvideKeyValueService)
	err := container.Invoke(func(us definitions.UserService,
		cf definitions.ConnectionFactory) {
		connectionFactory = cf
		userServiceTest = us
		blockingServiceTest = ProvideBlockingService(cf, us)
	})
	return container, err
}
func GetDifferentUserContexts(tx *sqlx.Tx, container *dig.Container) (customContext.Context, customContext.Context, error) {
	var user1Context = customContext.Context{}
	var user2Context = customContext.Context{}

	user1Context.Connection = tx
	user2Context.Connection = tx

	users, err := userServiceTest.GetUsers(functionParameters.GetUsersDTO{
		Context: user1Context,
	})
	if err != nil {
		return user1Context, user2Context, err
	}
	if len(users) < 2 {
		return user1Context, user2Context, errors.New("Для проверки блокировок необходимо минимум 2 пользователя в бд")
	}
	user1GinContext, err := testhelper.GetContextWithBearerToken(functionParameters.GetContextWithBearerTokenDTO{
		Context:   user1Context,
		Container: *container,
		UserID:    users[0].ID,
	})
	if err != nil {
		return user1Context, user2Context, err
	}
	user2GinContext, err := testhelper.GetContextWithBearerToken(functionParameters.GetContextWithBearerTokenDTO{
		Context:   user1Context,
		Container: *container,
		UserID:    users[1].ID,
	})
	if err != nil {
		return user1Context, user2Context, err
	}

	user1Context.GinContext = user1GinContext
	user2Context.GinContext = user2GinContext
	return user1Context, user2Context, err
}
func TestBlock(t *testing.T) {
	container, err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}
	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		t.Errorf(err.Error())
	}
	defer tx.Rollback()

	user1Context, user2Context, err := GetDifferentUserContexts(tx, container)

	user1, err := userServiceTest.GetUserFromContext(functionParameters.GetUserFromContextDTO{
		Context: user1Context,
	})
	if err != nil {
		t.Errorf(err.Error())
	}

	if err != nil {
		t.Errorf(err.Error())
	}

	var objectID = customTypes.RandomValidUUID()

	initialBlockResult, err := blockingServiceTest.BlockObject(functionParameters.BlockUnblockObjectDTO{
		Context:  user1Context,
		ObjectID: objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if initialBlockResult != nil {
		t.Errorf("Ошибка при пустом ожидании: " + initialBlockResult.Error())
	}
	errorBlockResult, err := blockingServiceTest.BlockObject(functionParameters.BlockUnblockObjectDTO{
		Context:  user2Context,
		ObjectID: objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	// Верная ли ошибка вернулась
	var fio2 = user1.GetShortFullName()
	var isRightError = strings.Contains(errorBlockResult.Error(), fio2)
	if isRightError == false {
		t.Errorf("Неверная ошибка: " + errorBlockResult.Error())
	}

	// Проверяю CanEditWithoutBlocking
	user1BlockError, err := blockingServiceTest.CanEditWithoutBlocking(functionParameters.BlockUnblockObjectDTO{
		Context:  user1Context,
		ObjectID: objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if user1BlockError != nil {
		t.Errorf("Ошибка при пустом ожидании: " + initialBlockResult.Error())
	}
	user2BlockError, err := blockingServiceTest.CanEditWithoutBlocking(functionParameters.BlockUnblockObjectDTO{
		ObjectID: objectID,
		Context:  user2Context,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	isRightError = strings.Contains(user2BlockError.Error(), fio2)
	if isRightError == false {
		t.Errorf("Неверная ошибка: " + user2BlockError.Error())
	}

	// Проверка разблокировки
	unblockStringError, err := blockingServiceTest.UnblockObject(functionParameters.BlockUnblockObjectDTO{
		Context:  user1Context,
		ObjectID: objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if unblockStringError != nil {
		t.Errorf("Unblock error " + unblockStringError.Error())
	}

	user2BlockError, err = blockingServiceTest.CanEditWithoutBlocking(functionParameters.BlockUnblockObjectDTO{
		Context:  user2Context,
		ObjectID: objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if user2BlockError != nil {
		t.Errorf("Ошибка при пустом ожидании, должно было разблокироваться: " + initialBlockResult.Error())
	}

	// Проверка разблокировки
	nonBlockedError, err := blockingServiceTest.CanEditWithBlocking(functionParameters.BlockUnblockObjectDTO{
		Context:  user1Context,
		ObjectID: objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if nonBlockedError != customErrors.ErrNoBlock {
		t.Errorf("Unblock error " + unblockStringError.Error())
	}
}
func TestSlateBlocking(t *testing.T) {
	container, err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}
	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		t.Errorf(err.Error())
	}
	defer tx.Rollback()

	user1Context, user2Context, err := GetDifferentUserContexts(tx, container)

	var objectID = customTypes.ValidUUID(uuid.New())

	// create stale block
	userError, err := blockingServiceTest.BlockObject(functionParameters.BlockUnblockObjectDTO{
		Context:      user1Context,
		BlockMinutes: customTypes.ValidInteger(-1),
		ObjectID:     objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if userError != nil {
		t.Errorf(userError.Error())
	}
	// check that stale block doesn't interfere
	user2Error, err := blockingServiceTest.BlockObject(functionParameters.BlockUnblockObjectDTO{
		Context:      user2Context,
		BlockMinutes: customTypes.ValidInteger(30),
		ObjectID:     objectID,
	})
	if err != nil {
		t.Errorf(err.Error())
	}
	if user2Error != nil {
		t.Errorf(userError.Error())
	}
	// check that live block does interfere
	userError, err = blockingServiceTest.BlockObject(functionParameters.BlockUnblockObjectDTO{
		Context:      user1Context,
		BlockMinutes: customTypes.ValidInteger(1),
		ObjectID:     objectID,
	})

	if err != nil {
		t.Errorf(err.Error())
	}
	if userError == nil {
		t.Errorf("should get an error")
	}

}
