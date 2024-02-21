package models

import (
	"atom24/customTypes"

	"github.com/google/uuid"
)

type NavigationButton struct {
	IdE98      uuid.NullUUID      `json:"idE98"`
	Caption    string             `json:"caption"`
	IdE99      string             `json:"idE99"`
	RouterLink string             `json:"routerLink"`
	IconClass  string             `json:"iconClass"`
	Children   []NavigationButton `json:"children"`
}

type AttributeValue struct {
	IdVersion        uuid.NullUUID           `json:"idVersion" db:"id_version"`
	IdBoundAttrubute uuid.NullUUID           `json:"idAttributeBound" db:"id_attribute_bound"`
	SValue           customTypes.NullString  `json:"sValue" db:"s_value"`
	FValue           customTypes.NullFloat   `json:"fValue" db:"f_value"`
	NValue           customTypes.NullInteger `json:"nValue" db:"n_value"`
	DValue           customTypes.NullDate    `json:"dValue" db:"d_value"`
}
type BondAttributeValue struct {
	IdVersionLink             uuid.NullUUID           `json:"idVersionLink" db:"id_version_link"`
	IdAttributeObjectTypeBond uuid.NullUUID           `json:"idAttributeObjectTypeBond" db:"id_attribute_object_type_bond"`
	SValue                    customTypes.NullString  `json:"sValue" db:"s_value"`
	FValue                    customTypes.NullFloat   `json:"fValue" db:"f_value"`
	NValue                    customTypes.NullInteger `json:"nValue" db:"n_value"`
	DValue                    customTypes.NullDate    `json:"dValue" db:"d_value"`
}
type Object struct {
	ID              uuid.NullUUID        `json:"id" db:"id"`
	IDObjectType    uuid.NullUUID        `json:"idObjectType" db:"id_object_type"`
	IDCreatorObject uuid.NullUUID        `json:"idCreatorObject" db:"id_creator_object"`
	CreateDateTime  customTypes.NullDate `json:"createDateTime" db:"d_create_date_time"`
}
type LinkType struct {
	Id             uuid.NullUUID          `json:"id" db:"id"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	CreatorLogin   customTypes.NullString `json:"creatorLogin" db:"s_creator_login"`
	CreateDateTime customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	IDIcon         uuid.NullUUID          `json:"idIcon" db:"id_icon"`
	Description    customTypes.NullString `json:"description" db:"s_description"`
}
type ObjectTypeLink struct {
	ID                      uuid.NullUUID          `json:"id" db:"id"`
	ObjectTypeMainName      customTypes.NullString `json:"objectTypeMainName" db:"s_object_type_main_name"`
	LinkTypeName            customTypes.NullString `json:"linkTypeName" db:"s_link_type_name"`
	ObjectTypeSecondaryName customTypes.NullString `json:"objectTypeSecondaryName" db:"s_object_type_secondary_name"`
	IdObjectTypeMain        uuid.NullUUID          `json:"idObjectTypeMain" db:"id_object_type_main"`
	IdObjectTypeSecondary   uuid.NullUUID          `json:"idObjectTypeSecondary" db:"id_object_type_secondary"`
	IdLinkType              uuid.NullUUID          `json:"idLinkType" db:"id_link_type"`
	IDObjectBondType        uuid.NullUUID          `json:"idObjectBondType" db:"id_object_bond_type"`
	ObjectBondTypeName      customTypes.NullString `json:"objectBondTypeName" db:"s_object_bond_type_name"`
}
type UpdateValueByKey struct {
	Key   string `db:"key"`
	Value string `db:"value"`
}
type BondValues struct {
	MainValue          interface{} `db:"main_value"`
	SecondaryValue     interface{} `db:"secondary_value"`
	MainBondValue      interface{} `db:"main_bond_value"`
	SecondaryBondValue interface{} `db:"secondary_bond_value"`
}

// модель (представления) - запроса на получение данных атрибутов
type AttributeObjects struct {
	IdObject            uuid.NullUUID           `json:"id_object" db:"id_object"`
	IsActive            bool                    `json:"is_active" db:"is_active"`
	ObjectTypeName      string                  `json:"object_type_name" db:"object_type_name"`
	S_Value             customTypes.NullString  `json:"s_value" db:"s_value"`
	F_Value             customTypes.NullString  `json:"f_value" db:"f_value"`
	N_Value             customTypes.NullInteger `json:"n_value" db:"n_value"`
	EndValue            interface{}             `json:"end_value"`
	NameAttributes      string                  `json:"name_attributes" db:"name_attributes"`
	NameTypesAttributes string                  `json:"name_types_attributes" db:"name_types_attributes"`
}

// модель (представления) - запроса на получение данных атрибутов
type AttributeDataType struct {
	ID   uuid.NullUUID          `json:"id" db:"id"`
	Name customTypes.NullString `json:"name" db:"s_name"`
}

// модель (представления) - запроса на получение данных атрибутов для генерации колонок
type NameAttributeColumn struct {
	IdObject uuid.NullUUID          `json:"id" db:"id"`
	S_Name   customTypes.NullString `json:"attributeDataTypeName" db:"attribute_data_type_name"`
}
type Attribute1 struct {
	IdTableName uuid.NullUUID `json:"id" db:"id"`
	S_Name      string        `json:"sName" db:"s_name"`
}
type Attribute struct {
	ID          uuid.NullUUID          `json:"id" db:"id"`
	Name        customTypes.NullString `json:"name" db:"s_name"`
	Description customTypes.NullString `json:"description" db:"s_description"`
	IDDataType  uuid.NullUUID          `json:"idDataType" db:"id_data_type"`
	DataType    customTypes.NullString `json:"dataType" db:"s_data_type"`
}
type ObjectType struct {
	ID                   uuid.NullUUID          `json:"id" db:"id"`
	Name                 customTypes.NullString `json:"name" db:"s_name"`
	IdKeyAttribute       uuid.NullUUID          `json:"idKeyAttribute" db:"id_key_attribute"`
	KeyAttributeName     customTypes.NullString `json:"keyAttributeName" db:"s_key_attribute_name"`
	KeyAttributeDataType customTypes.NullString `json:"keyAttributeDataType" db:"s_key_attribute_data_type"`
	IDIcon               uuid.NullUUID          `json:"idIcon" db:"id_icon"`
	IDCreator            uuid.NullUUID          `json:"idCreator" db:"id_creator"`
	CreatorLogin         customTypes.NullString `json:"creatorLogin" db:"s_creator_login"`
	CreateDateTime       customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	Description          customTypes.NullString `json:"description" db:"s_description"`
}

type BondType struct {
	ID   uuid.NullUUID          `json:"id" db:"id"`
	Name customTypes.NullString `json:"name" db:"s_name"`
}
type RolesAccessByLevels struct {
	RoleAccessRead  []RolesAccess
	RoleAccessWrite []RolesAccess
	RoleAccessFull  []RolesAccess
}
type Filter struct {
	ID                  uuid.NullUUID          `db:"id"`
	Name                customTypes.NullString `db:"s_name"`
	Query               customTypes.NullString `db:"s_query"`
	ValueTransformation customTypes.NullString `db:"s_value_transformation"`
	FieldType           customTypes.NullString `db:"s_field_type"`
}
type FilterObjectDTO struct {
	Query string
	Args  map[string]interface{}
}
type InsertOrUpdateVersionQO struct {
	UpdateVersionIDs          []uuid.NullUUID
	InsertVersionLinksQuery   string
	InsertVersionLinksArgs    map[string]interface{}
	InsertVersionsQuery       string
	InsertObjectsQuery        string
	InsertQuery               string
	UpdateQuery               string
	RefreshJSONRepresentation string
	Args                      map[string]interface{}
}
type GetVersionsQueryResult struct {
	Query string
	Args  map[string]interface{}
}
type RolesAccess struct {
	ID           uuid.NullUUID               `json:"id" db:"id"`
	IDRole       uuid.NullUUID               `json:"idRole" db:"id_role"`
	IDObjectType uuid.NullUUID               `json:"idObjectType" db:"id_object_type"`
	Level        customTypes.NullInteger     `json:"level" db:"n_level"`
	Constraints  customTypes.JSONFilterGroup `json:"constraints" db:"j_constraints"`
	Description  customTypes.NullString      `json:"description" db:"s_description"`
}
type RichVersion struct {
	ID       uuid.NullUUID             `json:"id" db:"id"`
	Number   customTypes.NullInteger   `json:"number" db:"n_number"`
	IDObject uuid.NullUUID             `json:"idObject" db:"id_object"`
	IsActive customTypes.NullBool      `json:"isActive" db:"is_active"`
	JValue   customTypes.JVersionValue `json:"jValue" db:"j_value"`
}
type Version struct {
	ID       uuid.NullUUID             `json:"id" db:"id"`
	Number   customTypes.NullInteger   `json:"number" db:"n_number"`
	IDObject uuid.NullUUID             `json:"idObject" db:"id_object"`
	IsActive customTypes.NullBool      `json:"isActive" db:"is_active"`
	JValue   customTypes.JVersionValue `json:"jValue" db:"j_value"`
}
type VersionLink struct {
	ID                 uuid.NullUUID      `json:"id" db:"id"`
	IDVersionMain      uuid.NullUUID      `json:"idVersionMain" db:"id_version_main"`
	IDVersionSecondary uuid.NullUUID      `json:"idVersionSecondary" db:"id_version_secondary"`
	IDObjectTypeLink   uuid.NullUUID      `json:"idObjectTypeLink" db:"id_object_type_link"`
	JValue             customTypes.JValue `json:"jValue" db:"j_value"`
}
type Role struct {
	ID          uuid.NullUUID          `json:"id" db:"id"`
	Name        customTypes.NullString `json:"name" db:"s_name"`
	StartingURL customTypes.NullString `json:"startingUrl" db:"s_starting_url"`
}
type Module struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	Description    customTypes.NullString `json:"description" db:"s_description"`
	StartingUrl    customTypes.NullString `json:"startingUrl" db:"s_starting_url"`
	CreateDateTime customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	IdLogo         uuid.NullUUID          `json:"idLogo" db:"id_logo"`
}
type ModuleForRole struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	Description    customTypes.NullString `json:"description" db:"s_description"`
	StartingUrl    customTypes.NullString `json:"startingUrl" db:"s_starting_url"`
	CreateDateTime customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	IdLogo         uuid.NullUUID          `json:"idLogo" db:"id_logo"`
	HasRole        customTypes.NullBool   `json:"hasRole" db:"has_role"`
}
type ObjectTypeForRole struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	IdKeyAttribute uuid.NullUUID          `json:"idKeyAttribute" db:"id_key_attribute"`
	IDIcon         uuid.NullUUID          `json:"idIcon" db:"id_icon"`
	HasAccess      customTypes.NullBool   `json:"hasAccess" db:"has_access"`
}
type UserForRole struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	FirstName      customTypes.NullString `json:"firstName" db:"s_first_name"`
	SecondName     customTypes.NullString `json:"secondName" db:"s_second_name"`
	LastName       customTypes.NullString `json:"lastName" db:"s_last_name"`
	HasRole        customTypes.NullBool   `json:"hasRole" db:"has_role"`
	IDPhoto        uuid.NullUUID          `json:"photoID" db:"id_photo"`
	RootDepartment customTypes.JValue     `json:"rootDepartment" db:"root_department"`
	MainPosition   customTypes.JValue     `json:"mainPosition" db:"main_position"`
}
type TokenPayload struct {
	UserID  uuid.NullUUID
	Modules []Module
}
type RoleForUser struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	IDCreator      uuid.NullUUID          `json:"idCreator" db:"id_creator"`
	CreateDateTime customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	IsSystem       customTypes.NullBool   `json:"isSystem" db:"is_system"`
	HasUser        customTypes.NullBool   `json:"hasUser" db:"has_user"`
}
type ObjectTypeBondForAttribute struct {
	ID                    uuid.NullUUID          `json:"id" db:"id"`
	MainObjectType        customTypes.NullString `json:"mainObjectType" db:"s_main_object_type"`
	SecondaryObjectType   customTypes.NullString `json:"secondaryObjectType" db:"s_secondary_object_type"`
	LinkType              customTypes.NullString `json:"linkType" db:"s_link_type"`
	IDObjectTypeMain      uuid.NullUUID          `json:"idObjectTypeMain" db:"id_object_type_main"`
	IDObjectTypeSecondary uuid.NullUUID          `json:"idObjectTypeSecondary" db:"id_object_type_secondary"`
	IDLinkType            uuid.NullUUID          `json:"idLinkType" db:"id_link_type"`
	IDObjectBondType      uuid.NullUUID          `json:"idObjectBondType" db:"id_object_bond_type"`
	IDCreator             uuid.NullUUID          `json:"idCreator" db:"id_creator"`
	CreateDateTime        customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	HasAttribute          customTypes.NullBool   `json:"hasAttribute" db:"has_attribute"`
}
type ObjectTypeForAttribute struct {
	ID                   uuid.NullUUID          `json:"id" db:"id"`
	Name                 customTypes.NullString `json:"name" db:"s_name"`
	IDKeyAttribute       uuid.NullUUID          `json:"idKeyAttribute" db:"id_key_attribute"`
	KeyAttributeName     customTypes.NullString `json:"keyAttributeName" db:"s_key_attribute_name"`
	KeyAttributeDataType customTypes.NullString `json:"keyAttributeDataType" db:"s_key_attribute_data_type"`
	IDIcon               uuid.NullUUID          `json:"idIcon" db:"id_icon"`
	IDCreator            uuid.NullUUID          `json:"idCreator" db:"id_creator"`
	CreateDateTime       customTypes.NullDate   `json:"createDateTime" db:"d_create_date_time"`
	HasAttribute         customTypes.NullBool   `json:"hasAttribute" db:"has_attribute"`
}
type BondAttributesForObjectTypeLink struct {
	ID                uuid.NullUUID          `json:"id" db:"id"`
	Name              customTypes.NullString `json:"name" db:"s_name"`
	DataType          customTypes.NullString `json:"dataType" db:"s_data_type"`
	HasObjectTypeLink customTypes.NullBool   `json:"hasObjectTypeLink" db:"has_object_type_link"`
	IsKeyAttribute    customTypes.NullBool   `json:"isKeyAttribute" db:"is_key_attribute"`
}
type AttributeForObjectType struct {
	ID            uuid.NullUUID          `json:"id" db:"id"`
	Name          customTypes.NullString `json:"name" db:"s_name"`
	DataType      customTypes.NullString `json:"dataType" db:"s_data_type"`
	IsKey         customTypes.NullBool   `json:"isKey" db:"is_key"`
	HasObjectType customTypes.NullBool   `json:"hasObjectType" db:"has_object_type"`
}
type AccessTokenPayload struct {
	UserID   string
	IP       string
	RoleURLs string
}
type RefreshTokenPayload struct {
	ID        string
	IsRefresh bool
	UserID    string
	IP        string
}

type BondAttributeBound struct {
	ID               uuid.NullUUID          `json:"id" db:"id"`
	IDObjectTypeLink uuid.NullUUID          `json:"idObjectTypeLink" db:"id_object_type_link"`
	IDAttribute      uuid.NullUUID          `json:"idAttribute" db:"id_attribute"`
	AttributeName    customTypes.NullString `json:"attributeName" db:"attribute_name"`
	AttributeType    customTypes.NullString `json:"attributeType" db:"attribute_type"`
}

/* type AttributesBound struct {
	ID           uuid.NullUUID `json:"id" db:"id"`
	IDAttribute  uuid.NullUUID `json:"idAttribute" db:"id_attribute"`
	IDObjectType uuid.NullUUID `json:"idObjectType" db:"id_object_type"`
} */

type AllAttribute struct {
	IdAttribute uuid.NullUUID `json:"id" db:"id"`
	S_Name      string        `json:"sName" db:"s_name"`
}
type Blocking struct {
	UserID    uuid.NullUUID        `json:"-" db:"id_user"`
	ObjectID  uuid.NullUUID        `json:"-" db:"id_object"`
	BlockTime customTypes.NullDate `json:"-" db:"d_block_time"`
}
type TokenDTO struct {
	AccessToken             string `json:"accessToken"`
	RefreshToken            string `json:"refreshToken"`
	User                    User   `json:"user"`
	Roles                   []Role `json:"roles"`
	AccessDurationInSeconds int    `json:"accessDurationInSeconds"`
	RefreshDurationInHours  int    `json:"refreshDurationInHours"`
}
type User struct {
	ID           uuid.NullUUID          `json:"id" db:"id"`
	Login        customTypes.NullString `json:"login" db:"s_login"`
	PasswordHash customTypes.NullString `json:"-" db:"s_password_hash"`
	Salt         customTypes.NullString `json:"-" db:"s_salt"`
	FirstName    customTypes.NullString `json:"firstName" db:"s_first_name"`
	SecondName   customTypes.NullString `json:"secondName" db:"s_second_name"`
	LastName     customTypes.NullString `json:"lastName" db:"s_last_name"`
}

type MessageMail struct {
	TabNum  customTypes.NullString `json:"tabnum" db:"tabnum"`
	Message customTypes.NullString `json:"message" db:"message"`
}

func (user User) GetShortFullName() string {
	var returnValue = user.SecondName.Str
	if user.FirstName.Valid == false || len(user.FirstName.Str) == 0 {
		return returnValue
	}
	returnValue += " " + string(user.FirstName.Str[0:2]) + "."
	if user.LastName.Valid == false || len(user.LastName.Str) == 0 {
		return returnValue
	}
	returnValue += " " + string(user.LastName.Str[0:2]) + "."
	return returnValue
}

type Position struct {
	ID            uuid.NullUUID          `json:"id" db:"id"`
	Name          customTypes.NullString `json:"name" db:"s_name"`
	Clarification customTypes.NullString `json:"clarification" db:"s_clarification"`
	Description   customTypes.NullString `json:"description" db:"s_description"`
}
type OrgStructureNode struct {
	ID            uuid.NullUUID          `json:"id" db:"id"`
	IDParent      uuid.NullUUID          `json:"idParent" db:"id_parent"`
	IDPosition    uuid.NullUUID          `json:"idPosition" db:"id_position"`
	IDDepartment  uuid.NullUUID          `json:"idDepartment" db:"id_department"`
	Name          customTypes.NullString `json:"name" db:"s_name"`
	Clarification customTypes.NullString `json:"clarification" db:"s_clarification"`
	Description   customTypes.NullString `json:"description" db:"s_description"`
	IDLogo        uuid.NullUUID          `json:"idLogo" db:"id_logo"`
	Children      []OrgStructureNode     `json:"children"`
}
type ContextDepartmentForRole struct {
	ID            uuid.NullUUID             `json:"id" db:"id"`
	JValue        customTypes.JVersionValue `json:"jValue" db:"j_value"`
	ExistsForRole customTypes.NullBool      `json:"existsForRole" db:"exists_for_role"`
}
type PositionForRole struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	IDOrgStructure uuid.NullUUID          `json:"idOrgStructure" db:"id_org_structure"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	Clarification  customTypes.NullString `json:"clarification" db:"s_clarification"`
	Description    customTypes.NullString `json:"description" db:"s_description"`
	ParentNodes    customTypes.JValue     `json:"parentNodes" db:"j_parent_nodes"`
}
type PositionForUser struct {
	ID             uuid.NullUUID          `json:"id" db:"id"`
	IDOrgStructure uuid.NullUUID          `json:"idOrgStructure" db:"id_org_structure"`
	IsMain         customTypes.NullBool   `json:"isMain" db:"is_main"`
	Name           customTypes.NullString `json:"name" db:"s_name"`
	Clarification  customTypes.NullString `json:"clarification" db:"s_clarification"`
	Description    customTypes.NullString `json:"description" db:"s_description"`
	ParentNodes    customTypes.JValue     `json:"parentNodes" db:"j_parent_nodes"`
}
type FilteringOption struct {
	ID                       uuid.NullUUID          `json:"id" db:"id"`
	IDFilter                 uuid.NullUUID          `json:"idFilter" db:"id_filter"`
	IDDataType               uuid.NullUUID          `json:"idDataType" db:"id_data_type"`
	DataTypeName             customTypes.NullString `json:"dataTypeName" db:"data_type_name"`
	FilterName               customTypes.NullString `json:"filterName" db:"filter_name"`
	FilterQuery              customTypes.NullString `json:"-" db:"filter_query"`
	FilterValueTranformation customTypes.NullString `json:"-" db:"filter_value_transformation"`
	FieldType                customTypes.NullString `json:"fieldType" db:"field_type"`
}

// модель на страницу типы объектов
type TypesObjectPages struct {
	IdObjectType          uuid.NullUUID          `json:"id_object_type" db:"id_object_type"`
	ObjectTypeName        string                 `json:"object_type_name" db:"object_type_name"`
	AttributeName         customTypes.NullString `json:"attributeName" db:"attribute_name"`
	AttributeDataTypeName customTypes.NullString `json:"attributeDataTypeName" db:"attribute_data_type_name"`
	S_defaultValue        customTypes.NullString `json:"sDefaultValue" db:"s_default_value"`
	S_dimension           customTypes.NullString `json:"sDimension" db:"s_dimension"`
	IdKey                 uuid.NullUUID          `json:"id_key_attribute" db:"id_key_attribute"`
	EndValue              interface{}            `json:"end_value"`
	EndValueType          interface{}            `json:"end_value_type"`
	S_DefaultValues       interface{}            `json:"sDefaultValues"`
}
type BigObject struct {
	Id             uuid.NullUUID `json:"id" db:"id"`
	ByteData       []byte        `db:"b_data"`
	LowQualityData []byte        `db:"b_low_quality_data"`
	Data           string        `json:"data"`
	Name           string        `json:"name" db:"s_name"`
}

//

func (value AttributeValue) Valid() bool {
	return value.IdVersion.Valid && value.IdBoundAttrubute.Valid
}

type BoundAttribute struct {
	BoundAttributeID  uuid.NullUUID          `json:"boundAttributeID" db:"bound_attribute_id"`
	IdObjectType      uuid.NullUUID          `json:"idObjectType" db:"id_object_type"`
	IdAttrubute       uuid.NullUUID          `json:"idAttribute" db:"id_attribute"`
	AttributeName     customTypes.NullString `json:"attributeName" db:"attribute_name"`
	ObjectTypeName    customTypes.NullString `json:"objectTypeName" db:"object_type_name"`
	AttributeDataType customTypes.NullString `json:"attributeDataType" db:"attribute_type"`
}

type FrontError struct {
	Message string
	Level   string
}
type LogMessage struct {
	UserLogin customTypes.NullString `json:"userLogin"`
	Message   customTypes.NullString `json:"message"`
	Stack     customTypes.NullString `json:"stack"`
}

type UpdateOrInsertVersionDTO struct {
	Type                  string
	Version               Version
	ArrayToUpdateOrInsert []UpdateOrInsertAttributeDTO
	ObjectType            ObjectType
}
type UpdateOrInsertVersionLinkDTO struct {
	Type                               string
	VersionLink                        VersionLink
	ArrayToUpdateOrInsertBondAttribute []UpdateOrInsertBondAttributeDTO
	ObjectType                         ObjectType
}
type InitialUploadResult struct {
	Inserted  int `json:"inserted"`
	Untouched int `json:"untouched"`
	Updated   int `json:"updated"`
}
type UpdateOrInsertBondAttributeDTO struct {
	Type               string
	BondBoundAttribute BondAttributeBound
	Value              interface{}
}
type UpdateOrInsertAttributeDTO struct {
	Type           string
	BoundAttribute BoundAttribute
	Value          interface{}
}

type LoadAttributeValueDTO struct {
	BoundAttribute BoundAttribute
	AttributeValue interface{}
}

type LoadLinkDTO struct {
	ObjectTypeLinkID   uuid.NullUUID
	SecondaryVersionID uuid.NullUUID
	ParentVersionID    uuid.NullUUID
	BondAttributeDTOs  []LoadBondAttributeDTO
}
type LoadBondAttributeDTO struct {
	BondAttribute      BondAttributeBound
	BondAttributeValue interface{}
}
type LoadManyToManyDTO struct {
	ID             uuid.NullUUID      `json:"id"`
	BondAttributes customTypes.JValue `json:"bondAttributes"`
}
type UpdateVersionDTO struct {
	VersionID       uuid.NullUUID                  `json:"versionID"`
	JValue          customTypes.JVersionValue      `json:"jValue"`
	ObjectTypeID    uuid.NullUUID                  `json:"objectTypeID"`
	ObjectTypeName  customTypes.NullString         `json:"objectTypeName"`
	ManyToManyLinks map[string][]LoadManyToManyDTO `json:"manyToManyLinks"`
}

type CreateVersionDTO struct {
	JValue          customTypes.JVersionValue      `json:"jValue"`
	ObjectTypeID    uuid.NullUUID                  `json:"objectTypeID"`
	ObjectTypeName  customTypes.NullString         `json:"objectTypeName"`
	ManyToManyLinks map[string][]LoadManyToManyDTO `json:"manyToManyLinks"`
}
type QueryObject struct {
	Query string
	Args  map[string]interface{}
}
