package customTypes

import (
	"database/sql/driver"
	"encoding/json"
)

type NullBool struct {
	BoolValue bool
	Valid     bool // Valid is true if UUID is not NULL
}

var NilBool NullBool = NullBool{BoolValue: false, Valid: false}

func ValidBool(value bool) NullBool {
	return NullBool{BoolValue: value, Valid: true}
}

// Value implements the driver Valuer interface.
func (nb NullBool) Value() (driver.Value, error) {
	if !nb.Valid {
		return nil, nil
	}
	return nb.BoolValue, nil
}

// number
func (ns *NullBool) Scan(value interface{}) error {
	if value == nil {
		ns.BoolValue, ns.Valid = false, false
		return nil
	}

	ns.BoolValue = value.(bool)
	ns.Valid = true
	return nil
}
func (ns NullBool) MarshalJSON() ([]byte, error) {
	if ns.Valid {
		return json.Marshal(ns.BoolValue)
	}

	return jsonNull, nil
}
func (ns *NullBool) UnmarshalJSON(b []byte) error {
	var stringValue = string(b)
	if stringValue == "null" {
		ns.BoolValue, ns.Valid = false, false
		return nil
	}

	var err = json.Unmarshal(b, &ns.BoolValue)
	if err != nil {
		ns.BoolValue, ns.Valid = false, false
		return err
	}
	ns.Valid = true
	return nil
}

type NullBoolArray struct {
	BoolValues []bool
	Valid      bool // Valid is true if UUID is not NULL
}

func (nb *NullBoolArray) UnmarshalJSON(b []byte) error {
	var stringValue = string(b)
	if stringValue == "null" {
		nb.BoolValues, nb.Valid = []bool{}, false
		return nil
	}

	var err = json.Unmarshal(b, &nb.BoolValues)
	if err != nil {
		nb.BoolValues, nb.Valid = []bool{}, false
		return err
	}
	nb.Valid = true
	return nil
}
