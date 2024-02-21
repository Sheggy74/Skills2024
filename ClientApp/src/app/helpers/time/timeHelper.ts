export class TimeHelper{
    static getTotalSeconds(date : Date) : number{
        return date.getTime()/1000
    }
    static getTotalHours(date : Date) : number{
        return date.getTime()/(1000 * 60 * 24)
    }
    static delay(time : number) : Promise<any>{
        return new Promise(res => setTimeout(res, time))
    }
}