import { Task } from "./Task"

export interface Application{
    id? : string
    name?: string
    date? : Date
    author? : string
    state? : string
    tasks? : Task[]
}