import { Tool } from "./Tool";
import { User } from "./User";

export interface Experiment{
  id? : string,
  name?: string,
  number?: string,
  date?: Date,
  user?: User,
  tool?: Tool
}
