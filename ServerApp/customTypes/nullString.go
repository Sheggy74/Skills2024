package customTypes

import (
	"database/sql/driver"
	"encoding/json"
	"math/rand"
	"strings"

	"github.com/google/uuid"
)

var letterRunes = []rune("йцукенгшщзхъыфывапролджэячсмитьбю.ЙЦУКЕНГШЩЗЪХЫФВАПРОЛЭЯЧСИМЮБЬ!!\"')*(&^)0987601234")

type NullString struct {
	Str   string
	Valid bool // Valid is true if UUID is not NULL
}

var NilSTR NullString = NullString{Str: "", Valid: false}
var NilUUID uuid.NullUUID = uuid.NullUUID{UUID: uuid.Nil, Valid: false}
var jsonNull = []byte("null")

func ValidString(value string) NullString {
	return NullString{
		Str:   value,
		Valid: true,
	}
}

// Scan implements the SQL driver.Scanner interface.
func (ns *NullString) Scan(value interface{}) error {
	if value == nil {
		ns.Str, ns.Valid = "", false
		return nil
	}

	ns.Str = value.(string)
	ns.Valid = true
	return nil
}

// Value implements the driver Valuer interface.
func (ns NullString) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return ns.Str, nil
}
func (ns NullString) MarshalJSON() ([]byte, error) {
	if ns.Valid {
		return json.Marshal(ns.Str)
	}

	return jsonNull, nil
}
func (ns *NullString) UnmarshalJSON(b []byte) error {
	var stringValue = string(b)
	if stringValue == "null" {
		ns.Str, ns.Valid = "", false
		return nil
	}

	ns.Str, ns.Valid = strings.Trim(stringValue, "\""), true
	return nil
}
func RandomValidString(n int) NullString {
	b := make([]rune, n+2)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return ValidString(string(b))
}
