package roleService

import (
	"atom24/definitions"
	"atom24/definitions/customErrors"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"strings"
)

type roleService struct {
	connectionFactory definitions.ConnectionFactory
}

func ProvideRoleService(c definitions.ConnectionFactory) definitions.RoleService {
	var service roleService
	service.connectionFactory = c
	return service
}

func (service roleService) GetRole(dto functionParameters.GetRolesDTO) (models.Role, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	result, err := service.GetRoles(dto)
	if err != nil {
		return models.Role{}, err
	}
	if len(result) > 1 {
		return models.Role{}, customErrors.ErrTooManyRows
	}
	if len(result) == 0 {
		return models.Role{}, nil
	}
	return result[0], nil
}

func (service roleService) GetRoles(dto functionParameters.GetRolesDTO) ([]models.Role, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var returnValues []models.Role

	var args = map[string]interface{}{}

	var query = `select 
					roles.*,
					users.s_login as creator_login
					from atom24.roles roles
					left join atom24.users users on users.id = roles.id_creator 
						where 1=1 `

	if dto.Name.Valid {
		args["name"] = strings.ToLower(dto.Name.Str)
		query = query + ` and lower(roles.s_name) = :name `
	}
	if dto.Id.Valid {
		args["id"] = dto.Id
		query = query + ` and roles.id = :id `
	}

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return returnValues, err
	}
	err = nstmt.Select(&returnValues, args)
	return returnValues, err
}
func (service roleService) GetRolesForUser(dto functionParameters.GetRoleForUserDTO) ([]models.Role, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var returnValues []models.Role

	var args = map[string]interface{}{
		"id_user": dto.IDUser,
	}

	var query = `select 
					roles.*
					from atom24.users_roles uRoles
					left join atom24.roles roles on roles.id = uRoles.id_role 
						where uRoles.id_user = :id_user`

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return returnValues, err
	}
	err = nstmt.Select(&returnValues, args)
	return returnValues, err
}
