import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { Tags } from 'src/app/Models/Tags';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService extends BaseApiService{

  localApiPath = this.apiURL + '/tags';
    
      tags = new BehaviorSubject<Tags[]>([]);
      selectedTag = new BehaviorSubject<Tags|undefined>(undefined);
  
      isLoading=new BehaviorSubject<boolean>(true);
  
      async updateData(){
        this.tags.next(await this.getTags());
      }
  
      getTags():Promise<Tags[]>{
          let retValue = lastValueFrom(this.http.get<Tags[]>(this.localApiPath)
            .pipe(
              map((project:any)=>{
                console.log(project.data);
                return project.data;
              }),
              catchError(this.exceptionService.getErrorHandlerList())));
          return retValue;
        }
  
      createTags(tagName:string):Promise<Tags>{
          let retValue=lastValueFrom(
            this.http.post<Tags>(this.localApiPath,{
              // ...body,
              name:tagName
            }).
              pipe(
               map((tags:any)=>{
                return tags.data;
               }),
               catchError(this.exceptionService.getErrorHandlerList()))
          )
          return retValue;
        }
        editTags(tagName:string,id?:number):Promise<Tags>{
          let retValue=lastValueFrom(
            this.http.put<Tags>(this.localApiPath+'/'+id,{
              name:tagName,
            }).
              pipe(
               map((tags:any)=>{
                return tags.data;
               }),
               catchError(this.exceptionService.getErrorHandlerList()))
          )
          return retValue;
        }
  
        deleteTags(id:number){
          let retValue=lastValueFrom(
            this.http.delete<any>(this.localApiPath+'/'+id)
              .pipe(
                catchError(this.exceptionService.getErrorHandlerList())
              )
          );
          return retValue;
        }
}
