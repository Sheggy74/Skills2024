import { Injectable } from '@angular/core';
import { NavigationStart, withDisabledInitialNavigation } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { jwtDTOKey } from 'src/app/helpers/keys/keys';
import { TimeHelper } from 'src/app/helpers/time/timeHelper';
import { AgileUIService } from '../AgileUIService/agileUI.service';
import { JWTDTO, JwtService } from '../JWTService/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class StateService {

    applicationURL: BehaviorSubject<string> = new BehaviorSubject('')
    applicationName: BehaviorSubject<string> = new BehaviorSubject("")
    jwtChanged: BehaviorSubject<JWTDTO> = new BehaviorSubject({})

    constructor() {
        this.setupJWTFromMemory();
    }

    getCurrentJWT() : JWTDTO{
        let jwtDTO : JWTDTO = {}
        let stringJWT = localStorage.getItem(jwtDTOKey)
        if(stringJWT == null || stringJWT == 'undefined'){
            return jwtDTO
        }

        let jwtAnyObject = JSON.parse(stringJWT)
        jwtAnyObject.accessEndDateTime = new Date(jwtAnyObject.accessEndDateTime)
        jwtAnyObject.refreshEndDateTime = new Date(jwtAnyObject.refreshEndDateTime)

        jwtDTO = jwtAnyObject
       
        return jwtDTO
    }
    setJWT(jwt : JWTDTO){
        // access
        let accessDuration = 60
        if(jwt.accessDurationInSeconds != null){
            accessDuration = jwt.accessDurationInSeconds
        }
        jwt.accessEndDateTime = new Date()
        jwt.accessEndDateTime.setTime((TimeHelper.getTotalSeconds(new Date()) + accessDuration) * 1000)

        // refresh
        let refreshDuration = 24
        if(jwt.refreshDurationInHours != null){
            refreshDuration = jwt.refreshDurationInHours
        }
        jwt.refreshEndDateTime = new Date()
        jwt.refreshEndDateTime.setHours((TimeHelper.getTotalHours(new Date()) + refreshDuration) * 1000 * 24 * 60)
        
        this.jwtChanged.next(jwt)
        localStorage.setItem(jwtDTOKey, JSON.stringify(jwt))
    }
    
    setupJWTFromMemory(){
        this.jwtChanged.next(this.getCurrentJWT())        
    }
    updateApplication(event: any) {
        if (event instanceof NavigationStart == false) {
            return
        }
        var urlArray = (event as NavigationStart).url.split('/');
        if (urlArray.length < 2) {
            this.applicationURL.next('')
            return
        }
        var currentApplication = urlArray[1]
        if (this.applicationURL.value != currentApplication) {
            this.applicationURL.next(currentApplication)
        }
    }
    updateApplicationByURL(url : string){
        var urlArray = url.split('/');
        if (urlArray.length < 2) {
            this.applicationURL.next('')
            return
        }
        var currentApplication = urlArray[1]
        if (this.applicationURL.value != currentApplication) {
            this.applicationURL.next(currentApplication)
        }
    }
}
