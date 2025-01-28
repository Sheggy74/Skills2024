import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { Projects } from 'src/app/Models/Projects';
import { User } from 'src/app/Models/User';
import { UserRole } from 'src/app/Models/UserRole';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseApiService{

  localApiPath = this.apiURL + '/projects';
  
    project = new BehaviorSubject<Projects[]>([]);
    selectedPrject = new BehaviorSubject<Projects|undefined>(undefined);

    isLoading=new BehaviorSubject<boolean>(true);

    async updateData(){
      this.project.next(await this.getProjects());
    }

    getProjects():Promise<Projects[]>{
        let retValue = lastValueFrom(this.http.get<Projects[]>(this.localApiPath)
          .pipe(
            map((project:any)=>{
              console.log(project.data);
              return project.data;
            }),
            catchError(this.exceptionService.getErrorHandlerList())));
        return retValue;
      }

    createProjects(body:Projects,user:UserRole[]):Promise<Projects>{
        let retValue=lastValueFrom(
          this.http.post<Projects>(this.localApiPath,{
            // ...body,
            users:user,
            name:body.name,
            description:body.description,
            icon:body.icon,
            theme:body.theme
          }).
            pipe(
             map((project:any)=>{
              return project.data;
             }),
             catchError(this.exceptionService.getErrorHandlerList()))
        )
        return retValue;
      }
      editProject(body:Projects,user:UserRole[],id?:number):Promise<Projects>{
        let retValue=lastValueFrom(
          this.http.put<Projects>(this.localApiPath+'/'+id,{
            ...body,
            users:user,
            name:body.name,
            description:body.description,
            icon:body.icon,
            theme:body.theme
          }).
            pipe(
             map((project:any)=>{
              return project.data;
             }),
             catchError(this.exceptionService.getErrorHandlerList()))
        )
        return retValue;
      }

      deleteProject(id:number){
        let retValue=lastValueFrom(
          this.http.delete<any>(this.localApiPath+'/'+id)
            .pipe(
              catchError(this.exceptionService.getErrorHandlerList())
            )
        );
        return retValue;
      }
}
