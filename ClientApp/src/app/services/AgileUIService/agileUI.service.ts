import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { NavigationButton } from 'src/app/Models/NavigationButton';
import { BaseApiService } from '../BaseApiService/base-api.service';

@Injectable({
    providedIn: 'root'
})
export class AgileUIService extends BaseApiService {

    constructor() {
        super();
    }
    getButtonsForRole(roleName: string): Promise<NavigationButton[]> {
        if (roleName == '') {
            return new Promise(() => [])
        }
        var retValue = lastValueFrom(this.http.get<NavigationButton[]>(this.apiURL + `/default/navigationButtons/${roleName}`)
            .pipe(catchError(this.exceptionService.getErrorHandlerList())));

        return retValue;
    }
   
}
