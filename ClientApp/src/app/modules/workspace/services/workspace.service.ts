import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Task } from "src/app/Models/Task";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";
@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends BaseApiService {
  localAPIPath = this.apiURL + '/workspace';

  tasks = new BehaviorSubject<Task[]>([]);
  selectedTask = new BehaviorSubject<Task | undefined>(undefined);
  isLoading = new BehaviorSubject<boolean>(true);

  async updateData(projectId: number) {
    this.tasks.next(await this.getTasksForProject(projectId));
  }

  getTasksForProject(projectId: number): Promise<Task[]> {
    let retValue = lastValueFrom(this.http.get<Task[]>(this.localAPIPath + "/" + projectId)
      .pipe(
        map((tasks: any) => {
          // console.log(tasks.data);
          return tasks.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  editTask(taskId: number, updatedTask: Task): Promise<any> {
    let retValue = lastValueFrom(
      this.http.put<Task>(this.localAPIPath + '/' + taskId, {
        ...updatedTask,
        user_id: updatedTask.name,
        tool_id: updatedTask.description,
      })
        .pipe(
          map((task: any) => {
            return task.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )

    return retValue;
  }
}
