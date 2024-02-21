package keyValueService

import (
	"atom24/customTypes"
	"atom24/definitions"
	"encoding/json"
	"time"

	"github.com/dgraph-io/badger/v4"
)

type keyValueService struct {
	keyValueDB *badger.DB
}

func ProvideKeyValueService() definitions.KeyValueService {
	var service keyValueService

	opt := badger.DefaultOptions("").WithInMemory(true)
	db, err := badger.Open(opt)
	if err != nil {
		panic(err)
	}
	service.keyValueDB = db

	return service
}
func (service keyValueService) GetValue(key string) (customTypes.NullString, error) {
	var strResult customTypes.NullString
	err := service.keyValueDB.View(func(txn *badger.Txn) error {
		result, err := txn.Get([]byte(key))
		if err == badger.ErrKeyNotFound {
			return nil
		}
		err = result.Value(func(val []byte) error {
			strResult.Str = string(val)
			strResult.Valid = true
			return nil
		})
		return err
	})
	return strResult, err
}
func (service keyValueService) SetKeyWithObject(key string, object interface{}) error {
	payload, err := json.Marshal(object)
	if err != nil {
		return err
	}
	service.SetKey(key, string(payload))
	return err
}

func (service keyValueService) SetKey(key string, value string) error {
	err := service.keyValueDB.Update(func(txn *badger.Txn) error {
		err := txn.Set([]byte(key), []byte(value))
		return err
	})
	if err != nil {
		return err
	}
	return err
}

func (service keyValueService) SetKeyWithExpiration(key string, value string, expiration time.Duration) error {
	err := service.keyValueDB.Update(func(txn *badger.Txn) error {
		e := badger.NewEntry([]byte(key), []byte(value)).WithTTL(expiration)
		err := txn.SetEntry(e)
		return err
	})
	if err != nil {
		return err
	}
	return err
}
