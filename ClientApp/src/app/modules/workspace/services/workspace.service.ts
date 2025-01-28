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
  selectedExperiment = new BehaviorSubject<Task | undefined>(undefined);
  isLoading = new BehaviorSubject<boolean>(true);

  async updateData(projectId: number){
    this.tasks.next(await this.getTasksForProject(projectId));
  }

  async getTasksForProject(projectId: number) {
    let retValue = lastValueFrom(this.http.get<Task[]>(this.localAPIPath+"/"+projectId)
            .pipe(
              map((tasks: any) => {
                return tasks.data;
              }),
              catchError(this.exceptionService.getErrorHandlerList())));
    
        return retValue;
  }
}
