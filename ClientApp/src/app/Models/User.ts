import { Role } from "./Role"

export interface User {
  id?: string
  login?: string
  email?: string
  firstName?: string
  secondName?: string
  lastName?: string
  photoURL?: string
  fio?: string
  place?: string
  job?: string
  phone?: string
  can_add?: boolean,
  prof_level?: number,
  role?: Role
}
