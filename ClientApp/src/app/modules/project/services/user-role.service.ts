import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { UserRole } from 'src/app/Models/UserRole';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends BaseApiService{

   localApiPath = this.apiURL + '/project/users';
    
      users = new BehaviorSubject<UserRole[]>([]);
      selectedUsers = new BehaviorSubject<UserRole[]|undefined>(undefined);
  
      isLoading=new BehaviorSubject<boolean>(true);
  
      async updateData(){
        this.users.next(await this.getUserRole());
      }
  
      getUserRole():Promise<UserRole[]>{
          let retValue = lastValueFrom(this.http.get<UserRole[]>(this.localApiPath)
            .pipe(
              map((UserRole:any)=>{
                console.log(UserRole.data);
                return UserRole.data;
              }),
              catchError(this.exceptionService.getErrorHandlerList())));
          return retValue;
        }

        getUserRoleID(id:number):Promise<UserRole[]>{
          let retValue = lastValueFrom(this.http.get<UserRole[]>(this.localApiPath+'/'+id)
            .pipe(
              map((UserRole:any)=>{
                console.log(UserRole.data);
                this.selectedUsers.next(UserRole.data);
                return UserRole.data;
              }),
              catchError(this.exceptionService.getErrorHandlerList())));
          return retValue;
        }
}
