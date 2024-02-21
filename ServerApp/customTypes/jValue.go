package customTypes

import (
	"encoding/json"
)

// #region 123
type JValue struct {
	Value map[string]interface{} `json:"attributes"`
	Valid bool
}

func (jv JValue) Reader() jValueReader {
	var reader jValueReader

	reader.jValue = jv
	return reader
}
func (jv JValue) Writer() jValueWriter {
	var writer jValueWriter

	writer.jValue = jv
	return writer
}

// #endregion 123
func (ns *JValue) Scan(value interface{}) error {
	if value == nil {
		ns.Valid = false
		return nil
	}
	ns.Valid = true
	err := json.Unmarshal(value.([]byte), &ns.Value)

	FormatValues(ns.Value, 1)

	return err
}
func (ns *JValue) CreateFromJSON(p []byte) error {
	var anotherMap map[string]interface{}

	var err = json.Unmarshal(p, &anotherMap)
	ns.Value = anotherMap
	ns.Valid = true
	return err
}

func (jv *JValue) MarshalJSON() ([]byte, error) {
	if jv.Valid {
		return json.Marshal(jv.Value)
	}

	return jsonNull, nil
}
func (ns *JValue) UnmarshalJSON(b []byte) error {
	var stringValue = string(b)
	if stringValue == "" {
		return nil
	}

	var err = json.Unmarshal(b, &ns.Value)

	return err
}
