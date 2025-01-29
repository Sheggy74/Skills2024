import { Tags } from './Tags';

export interface Projects{
    id?:number,
    name?:string,
    description?:string,
    icon?:string,
    theme?:string,
    tags?:Tags[]
}