package keyValueService

import (
	"atom24/definitions"
	"encoding/json"
	"testing"
	"time"

	"go.uber.org/dig"
)

var keyValueServiceTest definitions.KeyValueService

func InitializeTest() (*dig.Container, error) {
	container := dig.New()

	keyValueServiceTest = ProvideKeyValueService()
	return container, nil
}

type TestKeyValueStruct struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func TestGetValidObjectValue(t *testing.T) {
	_, err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}

	var keyValueStruct = TestKeyValueStruct{
		Key:   "key",
		Value: "value",
	}

	err = keyValueServiceTest.SetKeyWithObject("test", keyValueStruct)
	if err != nil {
		t.Errorf(err.Error())
	}
	value, err := keyValueServiceTest.GetValue("test")
	if err != nil {
		t.Errorf(err.Error())
	}
	err = json.Unmarshal([]byte(value.Str), &keyValueStruct)
	if err != nil {
		t.Errorf(err.Error())
	}
	if keyValueStruct.Key != "key" || keyValueStruct.Value != "value" {
		t.Errorf("Неверные значения")
	}
}
func TestGetValidValue(t *testing.T) {
	_, err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}

	err = keyValueServiceTest.SetKey("test", "testValue")
	if err != nil {
		t.Errorf(err.Error())
	}
	value, err := keyValueServiceTest.GetValue("test")
	if err != nil {
		t.Errorf(err.Error())
	}
	if value.Valid == false || value.Str != "testValue" {
		t.Errorf("Невалидное или неверное значение")
	}
}
func TestExpirationValue(t *testing.T) {
	_, err := InitializeTest()
	if err != nil {
		t.Errorf(err.Error())
	}

	// test pass expiration
	err = keyValueServiceTest.SetKeyWithExpiration("test", "value", time.Second)
	if err != nil {
		t.Errorf(err.Error())
	}
	value, err := keyValueServiceTest.GetValue("test")
	if err != nil {
		t.Errorf(err.Error())
	}
	if value.Valid == false || value.Str != "value" {
		t.Errorf("Невалидное или неверное значение")
	}

	// test fail expiration
	err = keyValueServiceTest.SetKeyWithExpiration("test", "value", time.Second*-1)
	if err != nil {
		t.Errorf(err.Error())
	}
	value, err = keyValueServiceTest.GetValue("test")
	if err != nil {
		t.Errorf(err.Error())
	}
	if value.Valid {
		t.Errorf("Значение не должно было сохраниться")
	}
}
