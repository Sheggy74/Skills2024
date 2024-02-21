package typehelper

import (
	"fmt"
	"reflect"
)

func IsInteger(value interface{}) bool {
	var kindOf = reflect.TypeOf(value).Kind()
	if kindOf == reflect.Int64 || kindOf == reflect.Int8 || kindOf == reflect.Int16 || kindOf == reflect.Int32 || kindOf == reflect.Int {
		return true
	}
	return false
}
func IsString(value interface{}) bool {
	var kindOf = reflect.TypeOf(value).Kind()
	if kindOf == reflect.String {
		return true
	}
	return false
}
func GetSQLForDataType(dataTypeCaption string) string {
	if dataTypeCaption == "Строка" {
		return "s_value"
	} else if dataTypeCaption == "Значение с плавающей точкой" {
		return "f_value"
	} else if dataTypeCaption == "Число" {
		return "n_value"
	} else if dataTypeCaption == "Дата/время" {
		return "d_value"
	} else if dataTypeCaption == "Логическое значение" {
		return "b_value"
	}
	return "NULL"
}
func GetFilterQueryForDataType(dataTypeCaption string, initialQuery string) string {
	if dataTypeCaption == "Строка" {
		return fmt.Sprintf("%v", initialQuery)
	} else if dataTypeCaption == "Значение с плавающей точкой" {
		return fmt.Sprintf("cast(%v as float8)", initialQuery)
	} else if dataTypeCaption == "Число" {
		return fmt.Sprintf("cast(%v as int8)", initialQuery)
	} else if dataTypeCaption == "Дата/время" {
		return fmt.Sprintf("cast(%v as timestamptz)", initialQuery)
	} else if dataTypeCaption == "Логическое значение" {
		return fmt.Sprintf("cast(%v as boolean)", initialQuery)
	}
	return "NULL"
}

func ConvertMapToStructure(m map[string]interface{}, s interface{}) {
	stValue := reflect.ValueOf(s).Elem()
	sType := stValue.Type()
	for i := 0; i < sType.NumField(); i++ {
		field := sType.Field(i)
		if value, ok := m[field.Name]; ok {
			stValue.Field(i).Set(reflect.ValueOf(value))
		}
	}
}
