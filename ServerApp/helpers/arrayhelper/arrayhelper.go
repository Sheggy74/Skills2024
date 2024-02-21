package arrayhelper

func AppendMapToMap(appendTo map[string]interface{}, appendFrom map[string]interface{}) map[string]interface{} {
	for key, value := range appendFrom {
		appendTo[key] = value
	}
	return appendTo
}
