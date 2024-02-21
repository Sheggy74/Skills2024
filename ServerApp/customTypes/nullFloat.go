package customTypes

import (
	"database/sql/driver"
	"encoding/json"
)

type NullFloat struct {
	Num   float64
	Valid bool // Valid is true if UUID is not NULL
}

var NilFloat NullFloat = NullFloat{Num: 0, Valid: false}

// Value implements the driver Valuer interface.
func (nn NullFloat) Value() (driver.Value, error) {
	if !nn.Valid {
		return nil, nil
	}
	return nn.Num, nil
}

// number
func (ns *NullFloat) Scan(value interface{}) error {
	if value == nil {
		ns.Num, ns.Valid = 0, false
		return nil
	}

	ns.Num = value.(float64)
	ns.Valid = true
	return nil
}
func (ns NullFloat) MarshalJSON() ([]byte, error) {
	if ns.Valid {
		return json.Marshal(ns.Num)
	}

	return jsonNull, nil
}
func ValidFloat(value float64) NullFloat {
	return NullFloat{
		Num:   value,
		Valid: true,
	}
}
func RandomValidFloat() NullFloat {
	var randomInteger = RandomInteger()
	return ValidFloat(float64(randomInteger.Num) + 0.5)
}
