import { ScriptState } from "./ScriptState";
import { ScriptType } from "./ScriptType";

export interface Script{
  id? : number,
  scriptstate?: ScriptState,
  textscript?: string,
  scripttype?: ScriptType
  result?: string
}
