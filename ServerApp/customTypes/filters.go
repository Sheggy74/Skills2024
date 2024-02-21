package customTypes

import (
	"encoding/json"
)

type JSONFilterGroup struct {
	Valid                bool
	Type                 NullString         `json:"type"`
	Filter               JSONFilter         `json:"filter"`
	Groups               []*JSONFilterGroup `json:"groups"`
	IsAnd                []bool             `json:"isAnd"`
	StringRepresentation NullString         `json:"-"`
}
type JSONFilterGroupString struct {
	Valid bool

	IsAnd  NullBoolArray `json:"isAnd"`
	Type   NullString    `json:"type"`
	Filter JSONFilter    `json:"filter"`
	Groups NullString    `json:"groups"`
}
type JSONFilter struct {
	FilterType NullString `json:"filterType"`
	ObjectType NullString `json:"objectType"`
	LinkType   NullString `json:"linkType"`
	Attribute  NullString `json:"attribute"`
	Option     NullString `json:"option"`
	Value      NullString `json:"value"`
}

func (fg JSONFilterGroup) MarshalJSON() ([]byte, error) {
	if fg.Valid {
		return json.Marshal(map[string]interface{}{
			"type":   fg.Type,
			"filter": fg.Filter,
			"groups": fg.Groups,
			"isAnd":  fg.IsAnd,
		})
	}

	return jsonNull, nil
}
func (fg *JSONFilterGroup) UnmarshalJSON(b []byte) error {
	var stringValue = string(b)
	if stringValue == "null" {
		fg.Valid = false
		return nil
	}
	err := fg.LoadFromString(string(b))
	if err != nil {
		return err
	}
	return nil
}
func (fg *JSONFilterGroup) LoadFromString(str string) error {
	newFilterGroup, err := UnmarshalIntoFilterGroup(str)
	if err != nil {
		fg.Valid = false
		return err
	}
	fg.IsAnd = newFilterGroup.IsAnd
	fg.Filter = newFilterGroup.Filter
	fg.Type = newFilterGroup.Type
	fg.Valid = true
	fg.Groups = newFilterGroup.Groups
	fg.StringRepresentation = ValidString(str)
	return nil
}
func (fg *JSONFilterGroup) Scan(value interface{}) error {
	if value == nil {
		fg.Valid = false
		return nil
	}
	err := fg.LoadFromString(string(value.([]uint8)))
	if err != nil {
		return err
	}
	return nil
}
func UnmarshalIntoFilterGroup(str string) (JSONFilterGroup, error) {
	var returnFG JSONFilterGroup
	var stringFG JSONFilterGroupString
	var err = json.Unmarshal([]byte(str), &stringFG)
	if err != nil {
		return returnFG, err
	}

	if stringFG.Groups.Valid && stringFG.Groups.Str != "[]" {
		// we need to get all the items from inner array and convert each one individually via recursive function
		stringGroups, err := GetAllGroups(stringFG.Groups.Str)
		if err != nil {
			return returnFG, err
		}

		for i := range stringGroups {
			singleGroup, err := UnmarshalIntoFilterGroup(stringGroups[i])
			if err != nil {
				return returnFG, err
			}
			returnFG.Groups = append(returnFG.Groups, &singleGroup)
		}
	}

	returnFG.IsAnd = stringFG.IsAnd.BoolValues
	returnFG.Filter = stringFG.Filter
	returnFG.Type = stringFG.Type
	returnFG.StringRepresentation = ValidString(str)
	returnFG.Valid = true
	return returnFG, nil
}
func GetAllGroups(stringGroups string) ([]string, error) {
	var results = []string{}
	var groupArray []map[string]interface{}

	err := json.Unmarshal([]byte(stringGroups), &groupArray)
	if err != nil {
		return results, err
	}

	for i := range groupArray {
		stringRepresentation, err := json.Marshal(groupArray[i])
		if err != nil {
			return results, err
		}
		results = append(results, string(stringRepresentation))
	}
	return results, nil
}
