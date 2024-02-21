package customTypes

import (
	"database/sql/driver"
	"encoding/json"
	"strings"
	"time"
)

type NullDate struct {
	Date  time.Time
	Valid bool // Valid is true if UUID is not NULL
}

var NilDATE NullDate = NullDate{Date: time.Time{}, Valid: false}

// Value implements the driver Valuer interface.
func (nd NullDate) Value() (driver.Value, error) {
	if !nd.Valid {
		return nil, nil
	}
	return nd.Date, nil
}

// number
func (ns *NullDate) Scan(value interface{}) error {
	if value == nil {
		ns.Date, ns.Valid = time.Time{}, false
		return nil
	}

	ns.Date = value.(time.Time)
	ns.Valid = true
	return nil
}
func (ns NullDate) MarshalJSON() ([]byte, error) {
	if ns.Valid {
		return json.Marshal(ns.Date)
	}

	return jsonNull, nil
}
func ValidDate(value time.Time) NullDate {
	return NullDate{
		Date:  value,
		Valid: true,
	}
}
func (ns *NullDate) UnmarshalJSON(p []byte) error {
	if string(p) == "" {
		ns.Date, ns.Valid = time.Time{}, false
		return nil
	}
	var valueToParse = strings.Trim(string(p), "\"")
	newDate, err := time.Parse(time.RFC3339Nano, valueToParse)
	ns.Date = newDate

	return err
}
