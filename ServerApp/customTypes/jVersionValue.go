package customTypes

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
)

type JVersionValue struct {
	Attributes  map[string]interface{} `json:"attributes"`
	ChildLinks  map[string]interface{} `json:"child_links"`
	ParentLinks map[string]interface{} `json:"parent_links"`
	Valid       bool
}

func (jv JVersionValue) GetAttributes() JValue {
	var jValue JValue

	jValue.Value = jv.Attributes
	return jValue
}
func (jv JVersionValue) GetChildLinks() JValue {
	var jValue JValue

	jValue.Value = jv.ChildLinks
	return jValue
}
func (jv JVersionValue) GetParentLinks() JValue {
	var jValue JValue

	jValue.Value = jv.ParentLinks
	return jValue
}
func (ns *JVersionValue) Scan(value interface{}) error {
	if value == nil {
		ns.Valid = false
		return nil
	}
	ns.Valid = true
	err := json.Unmarshal(value.([]byte), ns)

	FormatValues(ns.ChildLinks, 1)
	FormatValues(ns.Attributes, 1)
	FormatValues(ns.ParentLinks, 1)

	return err
}

// Функция переводит float значения в int если возможно
func FormatValues(objectMap map[string]interface{}, level int) {
	if level > 6 {
		return
	}
	for key, value := range objectMap {
		var kindOf = reflect.TypeOf(value).Kind()

		if kindOf == reflect.Map {
			// lower values
			var attributeValueLevel = value.(map[string]interface{})
			if attributeValueLevel == nil {
				continue
			}
			if attributeValueLevel["value"] != nil && attributeValueLevel["formatted_value"] != nil {
				objectMap[key] = attributeValueLevel["value"]

				var valueKindOf = reflect.TypeOf(objectMap[key]).Kind()
				if valueKindOf == reflect.Float64 {
					var floatString = fmt.Sprintf("%v", objectMap[key])
					// If float value can be parse as integer, parse it that way
					i, err := strconv.ParseInt(floatString, 10, 64)
					if err == nil {
						objectMap[key] = int(i)
						continue
					}

				}
				continue
			}

			var nextLevel = value.(map[string]interface{})
			if nextLevel == nil {
				continue
			}
			FormatValues(nextLevel, level+1)
		}
	}
}
