import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, lastValueFrom, map } from 'rxjs';
import { ReportTask } from 'src/app/Models/reportTask';
import { Task } from 'src/app/Models/Task';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskWorkService extends BaseApiService {

  localApiPath = this.apiURL + '/reportTask';

  tasks = new BehaviorSubject<ReportTask[]>([]);
  selectedTask = new BehaviorSubject<ReportTask[] | undefined>(undefined);

  isLoading = new BehaviorSubject<boolean>(true);

  // async updateTasks(){
  //   this.tasks.next(await this.getTasks());
  // }

  getTasks(): Promise<ReportTask[]> {
    let retValue = lastValueFrom(this.http.get<ReportTask[]>(this.localApiPath)
      .pipe(
        map((EventCalendar: any) => {
          this.tasks.next(EventCalendar.data);
          return EventCalendar.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }

  createProjects(body: ReportTask): Promise<ReportTask> {
    let retValue = lastValueFrom(
      this.http.post<ReportTask>(this.localApiPath, {
        ...body
      }).
        pipe(
          map((task: any) => {
            this.tasks.next(task.data);
            return task.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )
    return retValue;
  }

  reportTaskDate(date: Date) {
    let d = date.getFullYear + '-' + date.getMonth() + '-' + date.getDay();
    // window.location.href='http://localhost:8000/api/reportTask/'+d;

  }
}
