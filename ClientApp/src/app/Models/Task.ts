import { Role } from "./Role"
import { User } from "./User";

export interface Task {
  id: number;
  name: string;
  description: string;
  dateCreation: Date; 
  taskStateId: number;
  projectId: number,
  performers: User[], 
  performersId: number[], 
  userId?: number,
  priorityId: number,
  // ptask_Id: number,
}