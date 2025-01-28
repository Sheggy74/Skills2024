import { Role } from "./Role"

// export interface Task{
//     id? : string
//     name?: string
//     roles?: Role[]
// }

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}