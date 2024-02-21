package functionParameters

import (
	"atom24/customContext"
	"atom24/customTypes"
	"atom24/definitions/models"
	"mime/multipart"

	"go.uber.org/dig"

	"github.com/google/uuid"
)

type GetObjectTypeDTO struct {
	Context        customContext.Context
	ID             uuid.NullUUID
	Name           customTypes.NullString
	IdKeyAttribute uuid.NullUUID
}

type GetBondTypesDTO struct {
	Context customContext.Context
}
type GetRoleAccess struct {
	Context      customContext.Context
	IDRole       uuid.NullUUID
	IDObjectType uuid.NullUUID
}
type GetFilteringOptions struct {
	Context      customContext.Context
	ID           uuid.NullUUID
	IDFilter     uuid.NullUUID
	IDDataType   uuid.NullUUID
	DataTypeName customTypes.NullString
	FilterName   customTypes.NullString
}
type GetBondAttributesBoundDTO struct {
	Context                 customContext.Context
	ID                      uuid.NullUUID
	ObjectTypeLinkID        uuid.NullUUID
	AttributeID             uuid.NullUUID
	AttributeName           customTypes.NullString
	LinkTypeName            customTypes.NullString
	MainObjectTypeName      customTypes.NullString
	SecondaryObjectTypeName customTypes.NullString
}

type InsertOrUpdateAttributeValueDTO struct {
	Context        customContext.Context
	IDVersion      uuid.NullUUID
	BoundAttribute models.BoundAttribute
	Value          interface{}
}
type InsertOrUpdateBondAttributeValueDTO struct {
	Context            customContext.Context
	IDVersionLink      uuid.NullUUID
	BondAttributeBound models.BondAttributeBound
	Value              interface{}
}
type CreateVersionDTO struct {
	Context  customContext.Context
	ObjectID uuid.NullUUID
	Number   customTypes.NullInteger
}
type CreateObjectDTO struct {
	Context      customContext.Context
	ObjectTypeID uuid.NullUUID
}
type CreateObjectWithVersionDTO struct {
	Context        customContext.Context
	ObjectTypeID   uuid.NullUUID
	ObjectTypeName customTypes.NullString
}
type CreateBondBetweenVersionsDTO struct {
	Context          customContext.Context
	IDMain           uuid.NullUUID
	IDSecondary      uuid.NullUUID
	IDObjectTypeLink uuid.NullUUID
	IDUser           uuid.NullUUID
}

type AuthenticateByLoginPasswordDTO struct {
	Context  customContext.Context
	User     models.User
	Login    customTypes.NullString
	Password customTypes.NullString
}
type AuthenticateByLdapDTO struct {
	Context  customContext.Context
	Login    customTypes.NullString
	Password customTypes.NullString
}
type AuthenticateUserDTO struct {
	Context  customContext.Context
	Login    customTypes.NullString
	Password customTypes.NullString
}
type CreateOrUpdateUserDTO struct {
	Context  customContext.Context
	User     models.User
	Password customTypes.NullString
	File     *multipart.FileHeader
}
type GetAttributesBoundForObjectTypeIDDTO struct {
	Context      customContext.Context
	IDObjectType uuid.NullUUID
}
type GetAttributesBoundDTO struct {
	Context        customContext.Context
	ID             uuid.NullUUID
	IDObjectType   uuid.NullUUID
	IDAttribute    uuid.NullUUID
	AttributeName  customTypes.NullString
	ObjectTypeName customTypes.NullString
}
type GetVersionLinkDTO struct {
	Context               customContext.Context
	ID                    uuid.NullUUID
	MainVersionID         uuid.NullUUID
	SecondaryVersionID    uuid.NullUUID
	MainObjectTypeID      uuid.NullUUID
	SecondaryObjectTypeID uuid.NullUUID
	ObjectLinkTypeID      uuid.NullUUID
	LinkTypeID            uuid.NullUUID
}
type GetObjectsDTO struct {
	Context      customContext.Context
	ID           uuid.NullUUID
	IDObjectType uuid.NullUUID
}
type GetVersionDTO struct {
	Context      customContext.Context
	ID           uuid.NullUUID
	IDObject     uuid.NullUUID
	IDObjectType uuid.NullUUID
	OnlyActive   customTypes.NullBool
	StringParams customTypes.NullString
	StringArgs   map[string]interface{}
	Limit        customTypes.NullInteger
	Offset       customTypes.NullInteger
}
type CreateRoleDTO struct {
	Context customContext.Context
	Role    models.Role
}
type UpdateRoleDTO struct {
	Context customContext.Context
	Role    models.Role
}
type UpdateObjectTypeRightsDTO struct {
	Context          customContext.Context
	HasReadRights    customTypes.NullBool
	HasWriteRights   customTypes.NullBool
	HasFullRights    customTypes.NullBool
	ReadFilter       customTypes.JSONFilterGroup
	WriteFilter      customTypes.JSONFilterGroup
	ObjectTypeID     uuid.NullUUID
	RoleID           uuid.NullUUID
	DescriptionRead  customTypes.NullString
	DescriptionWrite customTypes.NullString
}
type GetRolesDTO struct {
	Context customContext.Context
	Id      uuid.NullUUID
	Name    customTypes.NullString
}

type GetRolesForUserDTO struct {
	Context customContext.Context
	Id      uuid.NullUUID
	Name    customTypes.NullString
}
type CanRoleBeDeletedDTO struct {
	Context customContext.Context
	Id      uuid.NullUUID
}
type DeleteRoleDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type SetKeyBondAttributeDTO struct {
	Context          customContext.Context
	IDAttribute      uuid.NullUUID
	IDObjectTypeLink uuid.NullUUID
}

type SetKeyAttributeDTO struct {
	Context      customContext.Context
	IDAttribute  uuid.NullUUID
	IDObjectType uuid.NullUUID
}

type CreateOrUpdateLinkTypeDTO struct {
	Context  customContext.Context
	LinkType models.LinkType
	File     *multipart.FileHeader
}
type CreateOrUpdateObjectTypeDTO struct {
	Context    customContext.Context
	ObjectType models.ObjectType
	File       *multipart.FileHeader
}
type CreateOrUpdateModuleDTO struct {
	Context customContext.Context
	Module  models.Module
	File    *multipart.FileHeader
}

type GetPositionsForUserDTO struct {
	Context        customContext.Context
	UserID         uuid.NullUUID
	IDOrgStructure uuid.NullUUID
}

type ExtractTokenFromContext struct {
	Context customContext.Context
}
type ExtractTokenPayloadFromContext struct {
	Context customContext.Context
}

type GetUserFromContextDTO struct {
	Context customContext.Context
}
type SetPostAsMainDTO struct {
	Context        customContext.Context
	UserID         uuid.NullUUID
	IDOrgStructure uuid.NullUUID
}
type ClearStaleBlockings struct {
	Context customContext.Context
}

type BlockUnblockObjectDTO struct {
	Context      customContext.Context
	BlockMinutes customTypes.NullInteger
	ObjectID     uuid.NullUUID
}

type CanDeleteLinkTypeDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type CanDeleteObjectTypeLinkDTO struct {
	Context customContext.Context
	LinkID  uuid.NullUUID
}

type GetContextWithBearerTokenDTO struct {
	Context   customContext.Context
	Container dig.Container
	UserID    uuid.NullUUID
}
type GetObjectTypeBondsForAttributeDTO struct {
	Context     customContext.Context
	IDAttribute uuid.NullUUID
}
type GetObjectTypesForAttributeDTO struct {
	Context     customContext.Context
	AttributeID uuid.NullUUID
}
type CreateOrUpdateAttributeDTO struct {
	Context     customContext.Context
	ID          uuid.NullUUID
	Name        customTypes.NullString
	DataTypeID  uuid.NullUUID
	Description customTypes.NullString
}
type AddDeletePositionUserDTO struct {
	Context        customContext.Context
	UserID         uuid.NullUUID
	IDOrgStructure uuid.NullUUID
}

type DeleteLinkTypeDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type DeleteObjectTypeDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type DeleteAttributeDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type CanDeleteObjectTypeDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type SetLinkAttributeIfNotExistsDTO struct {
	Context            customContext.Context
	LinkID             uuid.NullUUID
	AttributeValue     interface{}
	BondAttributeBound models.BondAttributeBound
}
type CreateLinkBetweenVersionsDTO struct {
	Context            customContext.Context
	MainVersionID      uuid.NullUUID
	SecondaryVersionID uuid.NullUUID
	LinKTypeID         uuid.NullUUID
}
type CanDeleteAttributeDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type CanDeleteModuleDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type DeleteModuleDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type GetModulesDTO struct {
	Context     customContext.Context
	ID          uuid.NullUUID
	Name        customTypes.NullString
	StartingURL customTypes.NullString
}
type GetModulesForUserDTO struct {
	Context customContext.Context
	UserID  uuid.NullUUID
}
type GetRolesForUserQODTO struct {
	UserID      uuid.NullUUID
	Modificator customTypes.NullString
}
type GetModulesForRoleDTO struct {
	Context customContext.Context
	RoleID  uuid.NullUUID
}
type GetObjectTypesForRoleDTO struct {
	Context customContext.Context
	RoleID  uuid.UUID
}
type GetUsersForRoleDTO struct {
	Context customContext.Context
	IDRole  uuid.NullUUID
}

type GetRoleForUserDTO struct {
	Context customContext.Context
	IDUser  uuid.NullUUID
}
type GetInsertOrUpdateVersionQO struct {
	VersionDTOs []models.UpdateOrInsertVersionDTO
}
type GetInsertOrUpdateVersionLinkQO struct {
	VersionLinkDTOs []models.UpdateOrInsertVersionLinkDTO
	ObjectTypeLink  models.ObjectTypeLink
}
type ProcessInsertOrUpdatesLinkVersionDTO struct {
	Context         customContext.Context
	Offset          customTypes.NullInteger
	VersionLinkDTOs []models.UpdateOrInsertVersionLinkDTO
	ObjectTypeLink  models.ObjectTypeLink
	StatusID        uuid.UUID
}
type ProcessInsertOrUpdatesVersionDTO struct {
	Context     customContext.Context
	VersionDTOs []models.UpdateOrInsertVersionDTO
	StatusID    uuid.UUID
}
type CompareValuesDTO struct {
	Value1            interface{}
	Value2            interface{}
	AttributeDataType string
	AttributeName     string
}
type GetVersionLinkFromSortedSliceDTO struct {
	VersionLinks       []models.VersionLink
	BondBoundAttribute models.BondAttributeBound
	AttributeValue     string
	MainVersionID      uuid.NullUUID
	SecondaryVersionID uuid.NullUUID
	LinkTypeID         uuid.NullUUID
	Length             int
}
type GetVersionFromSortedSliceDTO struct {
	Versions       []models.Version
	BoundAttribute models.BoundAttribute
	AttributeValue string
	Length         int
}
type SortVersionLinksByAttributeDTO struct {
	VersionLinks  []models.VersionLink
	AttributeName string
}
type SortVersionsByAttributeDTO struct {
	Versions      []models.Version
	AttributeName string
}
type GetBoundAttributesForObjectTypeDTO struct {
	Context      customContext.Context
	ObjectTypeID uuid.NullUUID
	Headers      []interface{}
}
type CanDeleteAttributeFromObjectTypeDTO struct {
	Context      customContext.Context
	IDAttribute  uuid.NullUUID
	IDObjectType uuid.NullUUID
}
type GetContextDepartmentsForUserDTO struct {
	Context customContext.Context
	UserID  uuid.NullUUID
}
type DeleteAttributeFromObjectTypeDTO struct {
	Context      customContext.Context
	IDAttribute  uuid.NullUUID
	IDObjectType uuid.NullUUID
}
type AddAttributeToObjectTypeDTO struct {
	Context      customContext.Context
	IDAttribute  uuid.NullUUID
	IDObjectType uuid.NullUUID
}

type CanDeleteAttributeFromObjectTypeBondDTO struct {
	Context          customContext.Context
	IDAttribute      uuid.NullUUID
	IDObjectTypeBond uuid.NullUUID
}
type DeleteAttributeFromObjectTypeBondDTO struct {
	Context          customContext.Context
	IDAttribute      uuid.NullUUID
	IDObjectTypeBond uuid.NullUUID
}
type DeleteObjectTypeLinkDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}

type LogDTO struct {
	LogLevel string
	// JSON object
	Message models.LogMessage
}
type LogErrorDTO struct {
	LogLevel string
	// JSON object
	Message models.LogMessage
}

type LogEndpointVisitationDTO struct {
	Context customContext.Context
}

type GetFiltersDTO struct {
	Context customContext.Context
}

type GetQOForRoleAndObjectTypeDTO struct {
	Context    customContext.Context
	RoleID     uuid.NullUUID
	ObjectType models.ObjectType
	Level      int
}
type GetQOForUserOrRoleDTO struct {
	Context      customContext.Context
	UserID       uuid.NullUUID
	ObjectTypeID uuid.NullUUID
	RoleID       uuid.NullUUID
	Level        int
}
type ConvertFilterGroupToQODTO struct {
	Context         customContext.Context
	UserID          uuid.NullUUID
	ObjectTypeID    uuid.NullUUID
	BoundAttributes []models.BoundAttribute
	Filters         []models.Filter
	FilterGroup     customTypes.JSONFilterGroup
	Depth           int
}
type AddDeletePositionToRoleDTO struct {
	Context        customContext.Context
	IDRole         uuid.NullUUID
	IDOrgStructure uuid.NullUUID
}

type AddDeleteContextDepartmentToRoleDTO struct {
	Context             customContext.Context
	IDRole              uuid.NullUUID
	IDDepartmentVersion uuid.NullUUID
}
type HasFullRightsDTO struct {
	Context        customContext.Context
	ObjectTypeName customTypes.NullString
	ObjectTypeID   uuid.NullUUID
	IDUser         uuid.NullUUID
	IDRole         uuid.NullUUID
}
type GetVersionFilteredDTO struct {
	Context        customContext.Context
	ID             uuid.NullUUID
	IDObject       uuid.NullUUID
	ObjectTypeName customTypes.NullString
	ObjectTypeID   uuid.NullUUID
	IDUser         uuid.NullUUID
	IDRole         uuid.NullUUID
	OnlyActive     customTypes.NullBool
	Level          int
	Modificator    customTypes.NullString
	StringParams   customTypes.NullString
	StringArgs     map[string]interface{}
	FilterGroup    customTypes.JSONFilterGroup
	Limit          customTypes.NullInteger
	Offset         customTypes.NullInteger
}
type ConvertFilterToQueryObjectDTO struct {
	Context         customContext.Context
	BoundAttributes []models.BoundAttribute
	Filters         []models.Filter
	FilterGroup     customTypes.JSONFilterGroup
}
type GetRolesAccessForObjectTypeDTO struct {
	Context      customContext.Context
	IDObjectType uuid.NullUUID
	IDUser       uuid.NullUUID
	IDRole       uuid.NullUUID
}

type ClearForObjectTypeDTO struct {
	Context      customContext.Context
	ObjectTypeID uuid.NullUUID
}
type CanDeleteObjectsDTO struct {
	Context      customContext.Context
	IDObjectType uuid.NullUUID
}
type GetPFP81RoutesDTO struct {
	Context     customContext.Context
	SearchValue customTypes.NullString
}
type GetObjectIDIfExistsDTO struct {
	Context        customContext.Context
	AttributeName  string
	ObjectTypeName string
	AttributeValue interface{}
}
type RefreshVersionLinksDTO struct {
	Context customContext.Context
	IDs     []uuid.NullUUID
}
type RefreshVersionsDTO struct {
	Context customContext.Context
	IDs     []uuid.NullUUID
}
type GetTechDocForProductionRouteDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type LoadProductionRouteOperationsDTO struct {
	Context           customContext.Context
	ProductionRouteID uuid.NullUUID
}
type GetLinkedObjectsJSONDTO struct {
	Context    customContext.Context
	ObjectID   uuid.NullUUID
	LinkTypeID uuid.NullUUID
	ShowMain   bool
}
type AddJValueVersionToVersionDTO struct {
	Context         customContext.Context
	JValueVersion   customTypes.JVersionValue
	VersionID       uuid.NullUUID
	ObjectTypeID    uuid.NullUUID
	ManyToManyLinks map[string][]models.LoadManyToManyDTO
}
type CheckForDuplicatesDTO struct {
	Context        customContext.Context
	AttributeValue interface{}
	BoundAttribute models.BoundAttribute
}
type GetLoadLinksDTOs struct {
	Context            customContext.Context
	JValueVersion      customTypes.JVersionValue
	ObjectTypeID       uuid.NullUUID
	IDVersion          uuid.NullUUID
	AllObjectTypeLinks []models.ObjectTypeLink
	ManyToManyLinks    map[string][]models.LoadManyToManyDTO
}
type AddAttributeToObjectTypeBondDTO struct {
	Context          customContext.Context
	IDAttribute      uuid.NullUUID
	IDObjectTypeBond uuid.NullUUID
}
type CreateLinkBetweenObjectTypesDTO struct {
	Context              customContext.Context
	IDParentObjectType   uuid.NullUUID
	IDLinkType           uuid.NullUUID
	IDChildObjectType    uuid.NullUUID
	IDObjectTypeBondType uuid.NullUUID
}
type AddDeleteRoleToUserDTO struct {
	Context customContext.Context
	IDRole  uuid.NullUUID
	IDUser  uuid.NullUUID
}
type CanDeleteUserDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type GetBlockingDTO struct {
	Context  customContext.Context
	UserID   uuid.NullUUID
	ObjectID uuid.NullUUID
}
type DeleteUserDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type AddDeleteRoleToModuleDTO struct {
	Context  customContext.Context
	IDRole   uuid.NullUUID
	IDModule uuid.NullUUID
}

type GetObjectCountDTO struct {
	Context      customContext.Context
	ObjectTypeID uuid.NullUUID
	SearchValue  customTypes.NullString
}

type GetFilterQueryForObjectTypeDTO struct {
	Context      customContext.Context
	ObjectTypeID uuid.NullUUID
	SearchValue  customTypes.NullString
}

type GenerateAdminTokenDTO struct {
	Context        customContext.Context
	User           models.User
	CustomDuration uuid.Time
}
type GenerateTokenDTO struct {
	Context             customContext.Context
	User                models.User
	WithoutRefreshToken customTypes.NullBool
}
type SaveRefreshTokenToDBDTO struct {
	Context customContext.Context
	TokenID string
	IDUser  uuid.NullUUID
}
type ValidateRefreshTokenDTO struct {
	Context customContext.Context
	TokenID string
	IDUser  uuid.NullUUID
}

type ClearRefreshTokensDTO struct {
	Context customContext.Context
	IDUser  uuid.NullUUID
}
type GetUsersDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
	Login   customTypes.NullString
}
type GetOrgStructureNodesDTO struct {
	Context      customContext.Context
	ID           uuid.NullUUID
	IDPosition   uuid.NullUUID
	IDDepartment uuid.NullUUID
}
type CanDeleteOrgStructureDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type CreateOrEditDepartmentDTO struct {
	Context       customContext.Context
	ID            uuid.NullUUID
	Name          customTypes.NullString
	Clarification customTypes.NullString
	Description   customTypes.NullString
	IDParent      uuid.NullUUID
	File          *multipart.FileHeader
}
type CreateOrEditPositionDTO struct {
	Context       customContext.Context
	PositionID    uuid.NullUUID
	Name          customTypes.NullString
	Clarification customTypes.NullString
	Description   customTypes.NullString
}

type DeletePositionDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type DeleteOrgStructureDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type GetPositionDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
}
type DeleteDepartmentDTO struct {
	Context        customContext.Context
	IDOrgStructure uuid.NullUUID
}
type AddPositionToOrgStructureDTO struct {
	Context    customContext.Context
	IDParent   uuid.NullUUID
	IDPosition uuid.NullUUID
}
type UploadFileDTO struct {
	Context customContext.Context
	ID      uuid.NullUUID
	File    *multipart.FileHeader
}
type GetAttributeValueDTO struct {
	Context          customContext.Context
	IDVersion        uuid.NullUUID
	IDAttributeBound uuid.NullUUID
	SValue           customTypes.NullString
	NValue           customTypes.NullInteger
	FValue           customTypes.NullFloat
	DValue           customTypes.NullDate
}
