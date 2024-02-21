package definitions

import (
	"atom24/customTypes"
	"atom24/definitions/functionParameters"
	"atom24/definitions/models"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/jmoiron/sqlx"
)

type ConnectionFactory interface {
	GetConnection() *sqlx.DB
	GetMacLabel() int
	CreateTxx() (*sqlx.Tx, error)
}

type BlockingService interface {
	BlockObject(dto functionParameters.BlockUnblockObjectDTO) (error, error)
	CanEditWithoutBlocking(dto functionParameters.BlockUnblockObjectDTO) (error, error)
	UnblockObject(dto functionParameters.BlockUnblockObjectDTO) (error, error)
	CanEditWithBlocking(dto functionParameters.BlockUnblockObjectDTO) (error, error)
}
type RoleService interface {
	GetRoles(dto functionParameters.GetRolesDTO) ([]models.Role, error)
	GetRolesForUser(dto functionParameters.GetRoleForUserDTO) ([]models.Role, error)
}
type KeyValueService interface {
	GetValue(key string) (customTypes.NullString, error)
	SetKey(key string, value string) error
	SetKeyWithExpiration(key string, value string, expiration time.Duration) error
	SetKeyWithObject(key string, object interface{}) error
}
type UserService interface {
	GetUser(dto functionParameters.GetUsersDTO) (models.User, error)
	GetUsers(dto functionParameters.GetUsersDTO) ([]models.User, error)
	CreateUser(dto functionParameters.CreateOrUpdateUserDTO) (models.User, error)
	CanDeleteUser(dto functionParameters.CanDeleteUserDTO) (string, error)
	DeleteUser(dto functionParameters.DeleteUserDTO) error
	UpdateUser(dto functionParameters.CreateOrUpdateUserDTO) (models.User, error)
	AuthenticateUser(dto functionParameters.AuthenticateUserDTO) (models.User, error, error)
	GetUserFromContext(dto functionParameters.GetUserFromContextDTO) (models.User, error)
	SendMail() (string, error)
}
type AuthService interface {
	AuthorizeIfTokenExists() gin.HandlerFunc
	AuthorizeByRole(role string) gin.HandlerFunc
}
type JWTService interface {
	Create(ttl time.Duration, content interface{}) (string, error)
	GenerateSalt() (string, error)
	Validate(token string) (interface{}, error)
	ValidateRefreshToken(dto functionParameters.ValidateRefreshTokenDTO) (bool, error)
	HashString(valueToHash string) (string, error)
	GenerateTokenDTO(dto functionParameters.GenerateTokenDTO) (models.TokenDTO, error)
	ClearRefreshTokens(dto functionParameters.ClearRefreshTokensDTO) error
	ExtractTokenPayloadFromContext(dto functionParameters.ExtractTokenPayloadFromContext) (models.AccessTokenPayload, error)
	ExtractTokenFromContext(dto functionParameters.ExtractTokenFromContext) (customTypes.NullString, error)
}

type ConfigService interface {
	GetStringKey(keyName string) string
	GetCWD() string
	IsLocalMode() bool
	GetTMP() string
	GetBoolKey(key string) bool
	GetIntKey(key string) int64
}

// StandardLogger enforces specific log message formats
type Logger interface {
	Log(dto functionParameters.LogDTO)
}
type BDataService interface {
	UploadFile(dto functionParameters.UploadFileDTO) error
}
