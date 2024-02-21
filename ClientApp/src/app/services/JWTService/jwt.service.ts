import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import SuperTokensLock from 'browser-tabs-lock';
import { catchError, lastValueFrom, of } from 'rxjs';
import { TimeHelper } from 'src/app/helpers/time/timeHelper';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { BaseApiService } from '../BaseApiService/base-api.service';
import { StateService } from '../StateService/state.service';

@Injectable({
    providedIn: 'root'
})
export class JwtService extends BaseApiService {

    localApiPath = this.apiURL + '/default/'
    router = inject(Router)
    stateService = inject(StateService)
    tokensLock = new SuperTokensLock()
    LOCK_TOKEN = "[PFF07] token"
    isLocked = false
    jwtRefreshDelay = 5
    isRefreshing = false
    constructor() {
        super()
    }
    // called on destruction of app
    async releaseTokenLockIfLocked(){
        if(this.isLocked){
            await this.tokensLock.releaseLock(this.LOCK_TOKEN)
        }
    }
    // called on destruction of app
    async releaseTokenOnApplicationStart(){
        await this.tokensLock.releaseLock(this.LOCK_TOKEN)
    }
    async refreshTokenIfCloseToEnd(): Promise<boolean> {
        if(this.isRefreshing){
            while(this.isRefreshing){
                await TimeHelper.delay(20)
            }
        }
        this.isRefreshing = true
        let currentJWT = this.stateService.getCurrentJWT()
        // уведомить приложение об обновлении токена, если произошло изменение, например logout
        if(this.stateService.jwtChanged.value.accessToken != currentJWT.accessToken){
            this.stateService.jwtChanged.next(currentJWT)
        }
        if (currentJWT.accessEndDateTime == null || currentJWT.refreshToken == null) {
            this.isRefreshing = false
            return false
        }
        let now = new Date()
        let differenceInSeconds = currentJWT.accessEndDateTime?.getTime() / 1000 - now.getTime() / 1000
        if (differenceInSeconds < this.jwtRefreshDelay) {
            let jwtDTO = await this.refreshToken(currentJWT.refreshToken)
            if (jwtDTO.accessToken != null) {
                this.stateService.setJWT(jwtDTO)
            }
        }
        this.isRefreshing = false
        return true
    }
    async delay(time: number): Promise<any> {
        return new Promise(res => setTimeout(res, time))
    }
    async refreshToken(refreshToken: string): Promise<JWTDTO> {
        let body = {
            refreshToken: refreshToken
        }
        let retValue = await lastValueFrom(this.http.post<JWTDTO>(this.localApiPath + 'refreshToken', body)
            .pipe(catchError(this.handleRefreshTokenError())));
        return retValue
    }
    handleRefreshTokenError(event: PointerEvent | undefined = undefined) {
        return (error: any) => {
            this.exceptionService.handleError(error, event);
            this.router.navigateByUrl("auth")
            this.stateService.setJWT({})
            return of({});
        }
    }
    async getToken(login: string, password: string, event: PointerEvent | undefined = undefined): Promise<JWTDTO> {
        let body = {
            login: login,
            password: password
        }
        let retValue = await lastValueFrom(this.http.post<JWTDTO>(this.localApiPath + 'getToken', body)
            .pipe(catchError(this.exceptionService.getErrorHandlerSingleObject(event))));
        return retValue
    }
}
export interface JWTDTO {
    accessToken?: string
    refreshToken?: string
    user? : User
    roles? : Role[]
    accessDurationInSeconds?: number
    refreshDurationInHours?: number
    accessEndDateTime?: Date
    refreshEndDateTime?: Date
}
