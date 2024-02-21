package jsonhelper

import (
	"bytes"
	"encoding/json"
	"strings"
)

// marshal json object without html escaping
func JSONMarshalWOHTML(t interface{}) ([]byte, error) {
	buffer := &bytes.Buffer{}
	encoder := json.NewEncoder(buffer)
	encoder.SetEscapeHTML(false)
	err := encoder.Encode(t)
	var stringResult = string(buffer.Bytes())
	stringResult = strings.ReplaceAll(stringResult, `\u003c`, `<`)
	stringResult = strings.ReplaceAll(stringResult, `\u003e`, `>`)
	return []byte(stringResult), err
}
