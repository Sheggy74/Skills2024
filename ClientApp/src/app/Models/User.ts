import { Role } from "./Role"

export interface User{
    id? : string
    login?: string
    email?: string
    firstName? : string
    secondName? : string
    lastName? : string
    idPhoto? : number
    fio?: string
    place?: string
    job?: string
    phone?: string
    role?: Role
}
