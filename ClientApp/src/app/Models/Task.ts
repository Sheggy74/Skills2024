import { Role } from "./Role"

export interface Task{
    id? : string
    name?: string
    roles?: Role[]
}