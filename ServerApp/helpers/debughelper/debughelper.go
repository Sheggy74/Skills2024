package debughelper

import (
	"fmt"
	"sort"
	"strings"
)

type SortedKeys struct {
	Key    string
	Length int
	Value  interface{}
}

func SubstituteParameters(query string, args map[string]interface{}) string {
	var sortedKeys = []SortedKeys{}
	for key, value := range args {
		sortedKeys = append(sortedKeys, SortedKeys{
			Key: key, Length: len(key),
			Value: value,
		})
	}
	sort.Slice(sortedKeys, func(i, j int) bool {
		return sortedKeys[i].Length > sortedKeys[j].Length
	})
	for _, sortedKey := range sortedKeys {
		var valueToInsert = fmt.Sprintf("%v", sortedKey.Value)
		valueToInsert = strings.ReplaceAll(valueToInsert, "{", "'")
		valueToInsert = strings.ReplaceAll(valueToInsert, " true}", "'")
		query = strings.ReplaceAll(query, fmt.Sprintf(":%v", sortedKey.Key), valueToInsert)
	}
	return query
}
