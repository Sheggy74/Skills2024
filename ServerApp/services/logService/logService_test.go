package logService

import (
	"atom24/customTypes"
	"atom24/definitions"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"atom24/factories"
	"atom24/services/configService"
	"fmt"
	"math"
	"testing"
	"time"

	"github.com/google/uuid"
	"go.uber.org/dig"
)

var loggerTest definitions.Logger
var connectionFactory definitions.ConnectionFactory
var configServiceTest definitions.ConfigService

func InitializeTest() (*dig.Container, error) {
	_, err := time.LoadLocation("Europe/Budapest")
	if err != nil {
		return nil, err
	}

	container := dig.New()
	container.Provide(configService.ProvideConfigurationServiceForTesting)
	container.Provide(factories.ProvideConnectionFactory)

	err = container.Invoke(func(connectionFactoryLocal definitions.ConnectionFactory,
		configServiceLocal definitions.ConfigService) {
		loggerTest = ProvideLogger(connectionFactoryLocal, configServiceLocal)
		connectionFactory = connectionFactoryLocal
		configServiceTest = configServiceLocal
	})

	return container, err
}

// Проверка верной работы функций логгирования на стороне БД
func TestDBFunctions(t *testing.T) {
	_, err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}

	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		t.Errorf(err.Error())
	}
	defer tx.Rollback()

	var message = fmt.Sprintf("%v", customTypes.RandomValidUUID().UUID)
	var args = map[string]interface{}{
		"message": message,
	}
	var errorQuery = "select atom24.log_error(:message)"
	var infoQuery = "select atom24.log_info(:message)"

	nstmt, err := tx.PrepareNamed(errorQuery)
	if err != nil {
		t.Errorf(err.Error())
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		t.Errorf(err.Error())
	}
	nstmt, err = tx.PrepareNamed(infoQuery)
	if err != nil {
		t.Errorf(err.Error())
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		t.Errorf(err.Error())
	}

	logs := []struct {
		Message string    `db:"s_message"`
		Level   string    `db:"s_level"`
		Time    time.Time `db:"d_time"`
	}{}

	var arg = map[string]interface{}{
		"message": fmt.Sprintf(`{"message": "%v"}`, message),
	}
	nstmt, err = tx.PrepareNamed(`select * from atom24.logging where s_message = :message`)
	if err != nil {
		t.Errorf("prapared statement error: %v", err)
	}
	err = nstmt.Select(&logs, arg)
	if err != nil {
		t.Errorf("prapared statement error: %v", err)
	}
	if len(logs) < 2 {
		t.Errorf("Неверное количество строк")
	}

}

// Проверка верной работы логгирования в БД, используя LogService
func TestBackendLogging(t *testing.T) {

	var level = configServiceTest.GetStringKey("min-log-level")

	uuidLogMessagge, err := uuid.NewRandom()
	if err != nil {
		t.Errorf("Got error in NewRandom(): %v", err)
	}

	var uuidString = fmt.Sprintf("%v", uuidLogMessagge)
	var timeStart = time.Now().Unix()

	loggerTest.Log(functionParameters.LogDTO{
		LogLevel: level,
		Message: models.LogMessage{
			Message: customTypes.ValidString(uuidString),
		},
	})

	tx, err := connectionFactory.CreateTxx()
	if err != nil {
		t.Errorf(err.Error())
	}
	defer tx.Rollback()

	message := struct {
		Message string    `db:"s_message"`
		Level   string    `db:"s_level"`
		Time    time.Time `db:"d_time"`
	}{}
	var arg = map[string]interface{}{
		"message": fmt.Sprintf(`{"userLogin":null,"message":"%v","stack":null}`, uuidString),
	}

	nstmt, err := tx.PrepareNamed(`select * from atom24.logging where s_message = :message`)
	if err != nil {
		t.Errorf("prapared statement error: %v", err)
	}
	err = nstmt.Get(&message, arg)
	if err != nil {
		t.Errorf("prapared statement error: %v", err)
	}

	var timeEnd = time.Now().Unix()
	var differenceEnd = timeEnd - message.Time.Unix()
	var differenceStart = message.Time.Unix() - timeStart

	if (message.Time.Unix() < timeStart || message.Time.Unix() > timeEnd) && (math.Abs(float64(differenceEnd)) > 60 || math.Abs(float64(differenceStart)) > 60) {
		t.Errorf("wrong time actual time: %v, before: %v, after: %v", message.Time.Unix(), timeStart, timeEnd)
	}
	if message.Level != level {
		t.Errorf("wrong error type, wanted %v. got %v", level, message)
	}
}
