package customTypes

type jValueReader struct {
	jValue JValue
}
type jValueWriter struct {
	jValue JValue
}

func (jVR jValueReader) ExtractPath(path []string) interface{} {
	var tempValue = jVR.jValue.Value

	for i, pathValue := range path {
		if i+1 == len(path) {
			return tempValue[pathValue]
		}
		var newValue = tempValue[pathValue]
		if newValue == nil {
			return nil
		}
		tempValue = newValue.(map[string]interface{})
	}
	return tempValue
}
func (jVR jValueWriter) SetPath(path []string, value interface{}) map[string]interface{} {
	var tempValue = jVR.jValue.Value

	for i, pathValue := range path {
		if i+1 == len(path) {
			tempValue[pathValue] = value
			return jVR.jValue.Value
		}
		if tempValue[pathValue] == nil {
			tempValue[pathValue] = map[string]interface{}{}
			tempValue = tempValue[pathValue].(map[string]interface{})
		}
	}
	return jVR.jValue.Value
}
