package blockingService

import (
	"atom24/definitions"
	"atom24/definitions/customErrors"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"errors"
)

const DEFAULT_BLOCK_TIME = 30

type blockingService struct {
	connectionFactory definitions.ConnectionFactory
	userService       definitions.UserService
}

func ProvideBlockingService(cf definitions.ConnectionFactory, us definitions.UserService) definitions.BlockingService {
	var service blockingService
	service.connectionFactory = cf
	service.userService = us

	return service
}
func (service blockingService) getBlocking(dto functionParameters.GetBlockingDTO) (models.Blocking, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	result, err := service.getBlockings(dto)
	if err != nil {
		return models.Blocking{}, err
	}
	if len(result) > 1 {
		return models.Blocking{}, customErrors.ErrTooManyRows
	}
	if len(result) == 0 {
		return models.Blocking{}, nil
	}
	return result[0], nil
}
func (service blockingService) getBlockings(dto functionParameters.GetBlockingDTO) ([]models.Blocking, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var returnValues []models.Blocking

	var args = map[string]interface{}{}

	var query = `select
						* 	
						from atom24.blocking blocking
							where 1=1 `
	if dto.ObjectID.Valid {
		query += " and blocking.id_object = :idObject \n "
		args["idObject"] = dto.ObjectID
	}
	if dto.UserID.Valid {
		query += " and blocking.id_user = :idUser \n "
		args["idUser"] = dto.UserID
	}
	// don't consider anything stale
	query += " and now() < d_block_time + interval '1 min' * n_block_minutes \n "

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return returnValues, err
	}
	err = nstmt.Select(&returnValues, args)
	if err != nil {
		return returnValues, err
	}
	return returnValues, nil
}
func (service blockingService) UnblockObject(dto functionParameters.BlockUnblockObjectDTO) (error, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	var visibleError error = nil

	visibleError, err := service.CanEditWithoutBlocking(dto)
	if err != nil || visibleError != nil {
		return visibleError, err
	}
	user, err := service.userService.GetUserFromContext(functionParameters.GetUserFromContextDTO{
		Context: dto.Context,
	})

	var args = map[string]interface{}{
		"idObject": dto.ObjectID,
		"idUser":   user.ID,
	}

	var query = `delete from atom24.blocking where id_object = :idObject and id_user = :idUser`

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return visibleError, err
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		return visibleError, err
	}
	return visibleError, nil
}
func (service blockingService) BlockObject(dto functionParameters.BlockUnblockObjectDTO) (error, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	var visibleError error

	//set default blocking time
	if dto.BlockMinutes.Valid == false {
		dto.BlockMinutes.Num = DEFAULT_BLOCK_TIME
		dto.BlockMinutes.Valid = true
	}

	visibleWithBlockError, err := service.CanEditWithBlocking(dto)
	if err != nil {
		return visibleWithBlockError, err
	}
	// объект уже заблокирован
	if visibleWithBlockError == nil {
		return visibleWithBlockError, err
	}

	visibleErrorWithoutBlock, err := service.CanEditWithoutBlocking(dto)
	// объект заблокирован кем то другим
	if err != nil || visibleErrorWithoutBlock != nil {
		return visibleErrorWithoutBlock, err
	}

	user, err := service.userService.GetUserFromContext(functionParameters.GetUserFromContextDTO{
		Context: dto.Context,
	})
	if err != nil {
		return visibleError, err
	}

	err = service.ClearStaleBlockings(functionParameters.ClearStaleBlockings{
		Context: dto.Context,
	})
	if err != nil {
		return visibleError, err
	}

	var args = map[string]interface{}{
		"idObject":     dto.ObjectID,
		"idUser":       user.ID,
		"blockMinutes": dto.BlockMinutes,
	}

	var query = `insert into atom24.blocking(id_object, id_user, n_block_minutes) values(:idObject, :idUser, :blockMinutes) on conflict do nothing`

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return visibleError, err
	}
	_, err = nstmt.Exec(args)
	if err != nil {
		return visibleError, err
	}
	return visibleError, nil
}
func (service blockingService) ClearStaleBlockings(dto functionParameters.ClearStaleBlockings) error {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}

	var query = `delete from atom24.blocking
					where now() > d_block_time + interval '1 min' * n_block_minutes`

	nstmt, err := conn.PrepareNamed(query)
	if err != nil {
		return err
	}
	_, err = nstmt.Exec(map[string]interface{}{})
	if err != nil {
		return err
	}
	return err
}
func (service blockingService) CanEditWithBlocking(dto functionParameters.BlockUnblockObjectDTO) (error, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	var visibleError error
	user, err := service.userService.GetUserFromContext(functionParameters.GetUserFromContextDTO{
		Context: dto.Context,
	})
	if err != nil {
		return visibleError, err
	}
	blocking, err := service.getBlocking(functionParameters.GetBlockingDTO{
		Context:  dto.Context,
		ObjectID: dto.ObjectID,
	})
	if err != nil {
		return visibleError, err
	}
	// Если объект уже заблокирован этим пользователем, всё норм
	if blocking.UserID.Valid && blocking.UserID == user.ID {
		return visibleError, nil
	}
	if blocking.UserID.Valid == false && blocking.ObjectID.Valid == false {
		return customErrors.ErrNoBlock, nil
	}
	// Если не этим, вернуть сообщение
	if blocking.UserID.Valid != false && blocking.UserID != user.ID {
		userWhoBlockedObject, err := service.userService.GetUser(functionParameters.GetUsersDTO{
			Context: dto.Context,
			ID:      blocking.UserID,
		})
		if err != nil {
			return visibleError, err
		}
		visibleError = errors.New("Объект заблокирован пользователем " + userWhoBlockedObject.GetShortFullName())
		return visibleError, nil
	}
	return visibleError, nil
}
func (service blockingService) CanEditWithoutBlocking(dto functionParameters.BlockUnblockObjectDTO) (error, error) {
	var conn = dto.Context.Connection
	if conn == nil {
		conn = service.connectionFactory.GetConnection()
	}
	var visibleError error
	user, err := service.userService.GetUserFromContext(functionParameters.GetUserFromContextDTO{
		Context: dto.Context,
	})
	if err != nil {
		return visibleError, err
	}
	blocking, err := service.getBlocking(functionParameters.GetBlockingDTO{
		Context:  dto.Context,
		ObjectID: dto.ObjectID,
	})
	if err != nil {
		return visibleError, err
	}
	// Если объект уже заблокирован этим пользователем, всё норм
	if blocking.UserID.Valid != false && blocking.UserID == user.ID {
		return visibleError, nil
	}
	// Если не этим, вернуть сообщение
	if blocking.UserID.Valid != false && blocking.UserID != user.ID {
		userWhoBlockedObject, err := service.userService.GetUser(functionParameters.GetUsersDTO{
			Context: dto.Context,
			ID:      blocking.UserID,
		})
		if err != nil {
			return visibleError, err
		}
		visibleError = errors.New("Объект заблокирован пользователем " + userWhoBlockedObject.GetShortFullName())
		return visibleError, nil
	}
	return visibleError, nil
}
