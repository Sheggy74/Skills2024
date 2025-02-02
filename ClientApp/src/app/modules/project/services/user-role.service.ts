import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { UserRole } from 'src/app/Models/UserRole';
import { UserRolePr } from 'src/app/Models/UserRolePr';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService extends BaseApiService{

  localApiPath = this.apiURL + '/project/users';
  
  users = new BehaviorSubject<UserRolePr[]>([]);
  selectedUsers = new BehaviorSubject<UserRolePr[]|undefined>(undefined);
  selectedRoleUsers=new BehaviorSubject<UserRolePr[]|undefined>(undefined);

  isLoading=new BehaviorSubject<boolean>(true);

  async updateData(){
    this.users.next(await this.getUserRole());
  }

  getUserRole():Promise<UserRolePr[]>{
      let retValue = lastValueFrom(this.http.get<UserRolePr[]>(this.localApiPath)
        .pipe(
          map((UserRole:any)=>{
            console.log(UserRole.data);
            return UserRole.data;
          }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }

  getUserRoleID(id:number):Promise<UserRolePr[]>{
    let retValue = lastValueFrom(this.http.get<UserRolePr[]>(this.apiURL+'/project/user/'+id)
      .pipe(
        map((UserRole:any)=>{
          console.log(UserRole.data);
          this.users.next(UserRole.data);
          return UserRole.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }
}
