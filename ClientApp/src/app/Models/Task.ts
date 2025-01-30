import { Role } from "./Role"

export interface Task {
  id: number;
  name: string;
  description: string;
  dateCreation: Date; 
  taskStateId: number;
  projectId: number,
  // userId: number,
  priorityId: number,
  // ptask_Id: number,
}