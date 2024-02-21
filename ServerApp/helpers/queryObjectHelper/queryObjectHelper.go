package queryObjectHelper

import (
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"errors"
	"fmt"
)

func GetRolesForUserQO(dto functionParameters.GetRolesForUserQODTO) (models.QueryObject, error) {
	var queryObject models.QueryObject

	if dto.UserID.Valid == false {
		return queryObject, errors.New("Передан невалидный user id")
	}

	var idUserKey = fmt.Sprintf("idUser%v", dto.Modificator.Str)

	queryObject.Args = map[string]interface{}{
		idUserKey: dto.UserID,
	}

	queryObject.Query = fmt.Sprintf(`
		-- getting roles for current user
		select 
			uRoles.id_role
			from atom24.users_roles uRoles
				where uRoles.id_user = :%v
				
		union
		-- getting roles for current user by positions
		select 
			rOrgPositions.id_role
			from atom24.users_org_positions uOrgPositions
				inner join atom24.roles_org_positions rOrgPositions on rOrgPositions.id_org_structure = uOrgPositions.id_org_structure
				where uOrgPositions.id_user = :%v 
	`, idUserKey, idUserKey)

	return queryObject, nil
}
