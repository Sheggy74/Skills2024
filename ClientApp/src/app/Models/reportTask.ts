
export interface ReportTask{
    id?:number,
    task_id?:number,
    name?:string,
    report_id?:number,
    date?:any,
    percent?:number,
    description?:string,
    oldPercent?:number,
    validDate?:{},
    validDescription?:{},
    validPercent?:boolean
}