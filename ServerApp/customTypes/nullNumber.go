package customTypes

import (
	"database/sql/driver"
	"encoding/json"
	"math/rand"
	"strconv"
	"strings"
)

type NullInteger struct {
	Num   int64
	Valid bool // Valid is true if UUID is not NULL
}

var NilINT NullInteger = NullInteger{Num: 0, Valid: false}

// Value implements the driver Valuer interface.
func (nn NullInteger) Value() (driver.Value, error) {
	if !nn.Valid {
		return nil, nil
	}
	return nn.Num, nil
}

// number
func (ns *NullInteger) Scan(value interface{}) error {
	if value == nil {
		ns.Num, ns.Valid = 0, false
		return nil
	}

	ns.Num = value.(int64)
	ns.Valid = true
	return nil
}
func (ni *NullInteger) UnmarshalJSON(b []byte) error {
	var stringValue = string(b)
	if stringValue == "null" {
		ni.Num, ni.Valid = 0, false
		return nil
	}
	numResult, err := strconv.Atoi(strings.Trim(stringValue, "\""))
	if err != nil {
		return err
	}
	ni.Num, ni.Valid = int64(numResult), true
	return nil
}
func (ns NullInteger) MarshalJSON() ([]byte, error) {
	if ns.Valid {
		return json.Marshal(ns.Num)
	}

	return jsonNull, nil
}
func ValidInteger(value int64) NullInteger {
	return NullInteger{
		Num:   value,
		Valid: true,
	}
}
func RandomInteger() NullInteger {
	return ValidInteger(rand.Int63n(1000))
}
