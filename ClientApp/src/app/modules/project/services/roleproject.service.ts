import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { RoleProject } from 'src/app/Models/RoleProject';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleprojectService extends BaseApiService{

  localApiPath = this.apiURL + '/roleprj';
  
  roleProjects = new BehaviorSubject<RoleProject[]>([]);
  selectedRoleProject = new BehaviorSubject<RoleProject[]|undefined>(undefined);

  isLoading=new BehaviorSubject<boolean>(true);

  async updateData(){
    this.roleProjects.next(await this.getRolesProject());
  }

  getRolesProject():Promise<RoleProject[]>{
      let retValue = lastValueFrom(this.http.get<RoleProject[]>(this.localApiPath)
        .pipe(
          map((RoleProject:any)=>{
            console.log(RoleProject.data);
            return RoleProject.data;
          }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }

}
