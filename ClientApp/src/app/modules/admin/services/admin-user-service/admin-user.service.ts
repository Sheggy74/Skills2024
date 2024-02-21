import { Injectable } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { NavigationButton } from 'src/app/Models/NavigationButton';
import { User } from 'src/app/Models/User';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService extends BaseApiService{

    localAPIPath = this.apiURL + `/admin/users/`

    getUsers(): Promise<User[]> {
        var retValue = lastValueFrom(this.http.get<User[]>(this.localAPIPath)
            .pipe(catchError(this.exceptionService.getErrorHandlerList())));

        return retValue;
    }
    updateUser(user : User, file : File | undefined = undefined, password : string | undefined = undefined): Promise<User> {
        var formData = new FormData()
        if(file != null){
            formData.append("loadFile", 'true')
            formData.append("photo", file)
        }
        if(password != undefined){
            formData.append("password", password)
        }
        formData.append("user", JSON.stringify(user))
        var retValue = lastValueFrom(this.http.post<User>(this.localAPIPath + 'update',formData)
            .pipe(catchError(this.exceptionService.getErrorHandlerSingleObject())));

        return retValue;
    }
    createUser(user : User, file : File | undefined = undefined, password : string | undefined = undefined): Promise<User> {
        var formData = new FormData()
        if(file != null){
            formData.append("loadFile", 'true')
            formData.append("photo", file)
        }
        if(password != undefined){
            formData.append("password", password)
        }
        formData.append("user", JSON.stringify(user))
        var retValue = lastValueFrom(this.http.post<User>(this.localAPIPath + 'create',formData)
            .pipe(catchError(this.exceptionService.getErrorHandlerSingleObject())));

        return retValue;
    }
    deleteUser(id : string): Promise<boolean> {
        var retValue = lastValueFrom(this.http.delete<boolean>(this.localAPIPath + 'delete/' + id)
            .pipe(catchError(this.exceptionService.getErrorHandlerBoolean())));
        return retValue;
    }
}
