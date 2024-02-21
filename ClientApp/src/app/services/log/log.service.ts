import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError, lastValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageType, ToastService } from '../ToastService/toast.service';
import { Toast } from 'primeng/toast';

@Injectable({
    providedIn: 'root'
})
export class LogService {

    toastService : ToastService = inject(ToastService)
    loggers : ILogger[] = []
    private http = inject(HttpClient)
    constructor() {
        this.logAction("created logger service")
        this.loggers.push(new ConsoleLogger())
        this.loggers.push(new ServerLogger())
    }
    activityStack: Activity[] = []

    logAction(message: string) {
        if(this.activityStack.length > 100){
            this.activityStack = this.activityStack.slice(-50)
        }
        // Для кучи одинаковых сообщений
        var lastValue = this.activityStack.at(this.activityStack.length-1)
        if(lastValue?.description == message){
            lastValue.endDate = new Date()
            lastValue.count += 1
            return;
        }
        
        this.activityStack.push({
            createTime: new Date(),
            description: message,
            count: 1
        })
    }

    
    getActivityStack() : string{
        let returnValue = ''
        for(let i = this.activityStack.length - 1; i > 0; i--){
            returnValue += JSON.stringify(this.activityStack[i]) + '\n'
        }
        return returnValue
    }
    debug(message: any) {
        this.log(message, LogLevel.debug)
    }
    info(message: any) {
        this.log(message, LogLevel.info)
    }
    warn(message: any) {
        this.log(message, LogLevel.warn)
    }
    error(message: any) {
        this.log(message, LogLevel.error)
    }

    log(message: string, level: LogLevel) {
        // To Console
        this.loggers.forEach(logger => logger.writeLog(message, level, this.getActivityStack()))
        /* var errorHandler = (error: HttpErrorResponse)=> {
            return of(false);
          }
          level.toString()
        var retValue = lastValueFrom(this.http.get<string>(environment.apiUrl + "logs/" + level.toString())
        .pipe(catchError(errorHandler))); */
    }
}
interface ILogger {
    writeLog(message: any, level: LogLevel, activityStack : string): void
}
class ConsoleLogger implements ILogger {
    writeLog(message: any, level: LogLevel, activityStack : string = ''): void {

        if (level == LogLevel.error) {
            console.error(message)
        }
        if (environment.consoleLogLevel == LogLevel[LogLevel.error]) {
            return
        }

        if (level == LogLevel.info) {
            console.info(message)
        }
        if (environment.consoleLogLevel == LogLevel[LogLevel.info]) {
            return
        }
        if (level == LogLevel.warn) {
            console.warn(message)
        }
        if (environment.consoleLogLevel == LogLevel[LogLevel.warn]) {
            return
        }
        if (level == LogLevel.debug) {
            // dont remove
            console.debug(message)
        }
    }
}
class ServerLogger implements ILogger {
    private http = inject(HttpClient)
    private toastService = inject(ToastService)
    private maxLogErrors = 3
    private logErrorCount = 0
        logLevel: LogLevel = LogLevel.debug
    constructor() {
        if (environment.serverLogLevel == LogLevel[LogLevel.info]) {
            this.logLevel = LogLevel.info
        }
        if (environment.serverLogLevel == LogLevel[LogLevel.debug]) {
            this.logLevel = LogLevel.debug
        }
        if (environment.serverLogLevel == LogLevel[LogLevel.warn]) {
            this.logLevel = LogLevel.warn
        }
        if (environment.serverLogLevel == LogLevel[LogLevel.error]) {
            this.logLevel = LogLevel.error
        }
    }
    async writeLog(message: any, level: LogLevel, activityStack : string) {
        if (level < this.logLevel) {
            return
        }
        let errorHandler = (error: HttpErrorResponse) => {
            // Ограничиваем максимальное количество ошибок для пользователя
            if(this.logErrorCount < this.maxLogErrors){
                this.toastService.show(MessageType.Error, "Ошибка логгирования на сервер")
                this.logErrorCount++
            }
            
            return of(false);
        }
        var dto = {
            message : message.toString() + "\n" + activityStack,
            level : LogLevel[level]
        }
        var retValue = await lastValueFrom(this.http.post<boolean>(environment.apiURL + '/default/log', dto)
            .pipe(catchError(errorHandler)));
    }
}
export enum LogLevel {
    debug = 0,
    info = 1,
    warn = 2,
    error = 3
}

export interface Activity {
    description: string
    createTime: Date
    endDate?: Date
    count : number
}