package customErrors

import "errors"

var ErrTooManyRows = errors.New("Found more than one result")
var ErrNoBlock = errors.New("Объект не заблокирован для редактирования")
var ErrWrongLoginPassword = errors.New("Неверная пара логин/пароль")
var NoGinContext = errors.New("No GinContext")
