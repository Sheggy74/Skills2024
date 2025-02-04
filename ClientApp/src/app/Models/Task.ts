import { Role } from "./Role"
import { User } from "./User";

export interface Task {
  id: number;
  name: string;
  description?: string;
  dateCreation?: Date; 
  stateId?: number;
  taskStateName?: number;
  projectId?: number,
  performers?: User[], 
  performersId?: number[], 
  userId?: number,
  priorityId?: number,
  deadline?: string,
  topicId?: number,
  topicName?: string,
  days?: number,
  // ptask_Id: number,
}