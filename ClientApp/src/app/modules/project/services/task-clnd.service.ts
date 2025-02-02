import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map ,lastValueFrom} from 'rxjs';
import { EventCalendar } from 'src/app/Models/EventCallendar';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskClndService extends BaseApiService{

  localApiPath = this.apiURL + '/project/task';
    
      tasks = new BehaviorSubject<EventCalendar[]>([]);
      selectedTask = new BehaviorSubject<EventCalendar[]|undefined>(undefined);
  
      isLoading=new BehaviorSubject<boolean>(true);
  
      // async updateTasks(){
      //   this.tasks.next(await this.getTasks());
      // }
  
      getTasks(id:number|undefined):Promise<EventCalendar[]>{
          let retValue = lastValueFrom(this.http.get<EventCalendar[]>(this.localApiPath+'/'+id)
            .pipe(
              map((EventCalendar:any)=>{
                console.log('event',EventCalendar.data);
                this.tasks.next(EventCalendar.data);
                return EventCalendar.data;
              }),
              catchError(this.exceptionService.getErrorHandlerList())));
          return retValue;
        }
}
