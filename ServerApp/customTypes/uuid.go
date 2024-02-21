package customTypes

import "github.com/google/uuid"

func ValidUUID(id uuid.UUID) uuid.NullUUID {
	return uuid.NullUUID{
		UUID:  id,
		Valid: true,
	}
}
func RandomValidUUID() uuid.NullUUID {
	return ValidUUID(uuid.New())
}
