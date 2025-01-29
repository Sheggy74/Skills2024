import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';
import { TagsProject } from 'src/app/Models/TagsProject';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsprService extends BaseApiService{

  localApiPath = this.apiURL + '/tagspr';
    
  tags = new BehaviorSubject<TagsProject[]>([]);
  selectedTag = new BehaviorSubject<TagsProject|undefined>(undefined);
  tagsID=new BehaviorSubject<TagsProject|undefined>(undefined);
  isLoading=new BehaviorSubject<boolean>(true);

  async updateData(){
    this.tags.next(await this.getTags());
  }

  getTags():Promise<TagsProject[]>{
      let retValue = lastValueFrom(this.http.get<TagsProject[]>(this.localApiPath)
        .pipe(
          map((project:any)=>{
            console.log(project.data);
            return project.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));
      return retValue;
    }

  createTags(body:TagsProject[]):Promise<TagsProject[]>{
      let retValue=lastValueFrom(
        this.http.post<TagsProject>(this.localApiPath,{
           ...body,
           mas:body
        }).
          pipe(
           map((tags:any)=>{
            this.tagsID.next(tags.data);
            return tags.data;
           }),
           catchError(this.exceptionService.getErrorHandlerList()))
      )
      return retValue;
    }

    deleteTags(id:string){
      let retValue=lastValueFrom(
        this.http.delete<any>(this.localApiPath+'/'+id)
          .pipe(
            catchError(this.exceptionService.getErrorHandlerList())
          )
      );
      return retValue;
    }
}
