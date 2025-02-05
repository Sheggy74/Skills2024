import { Role } from "./Role"
import { Topics } from "./Topics";
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
  topicId?: string,
  topicName?: string,
  days?: number,
  topic?: Topics,
  orderNumber?: number,
  newOrder?: any[];
  isPlanned?: boolean;
  // ptask_Id: number,
}