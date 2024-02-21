package loadModels

import (
	"atom24/customContext"
	"atom24/definitions/models"

	"github.com/google/uuid"

	"github.com/jmoiron/sqlx"
)

type CreateOrUpdateBondBetweenVersionsDTO struct {
	FromDB                     *sqlx.DB
	FromQuery                  string
	MainType                   string
	Link                       string
	SecondaryType              string
	MainAttributeName          string
	SecondaryAttributeName     string
	MainBondAttributeName      string
	SecondaryBondAttributeName string
	Offset                     int
}

type InitialLoadFromToPostgresDTO struct {
	FromQuery      string
	ObjectTypeName string
	AttributeName  string
}

type LoadMultipleValuesWithoutCreationDTO struct {
	Values             []models.UpdateValueByKey
	ObjectTypeName     string
	AttributeKeyName   string
	AttributeValueName string
}
type GetOrCreateLinkWithBondValuesDTO struct {
	Context            customContext.Context
	VersionMainID      uuid.NullUUID
	VersionSecondaryID uuid.NullUUID
	ObjectTypeLinkID   uuid.NullUUID
	BondAttributeBound models.BondAttributeBound
	BondValue          interface{}
}
type GetOrCreateLinkWithoutBondValuesDTO struct {
	Context            customContext.Context
	VersionMainID      uuid.NullUUID
	VersionSecondaryID uuid.NullUUID
	ObjectTypeLinkID   uuid.NullUUID
}
