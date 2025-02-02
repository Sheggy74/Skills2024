import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Task } from "src/app/Models/Task";
import { Projects } from "src/app/Models/Projects";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";
import { Priority } from "src/app/Models/Priority"
import { UserRole } from "src/app/Models/UserRole"
import { User } from "src/app/Models/User";
@Injectable({
  providedIn: 'root'
})
export class ProjectUserService extends BaseApiService {
  localAPIPath = this.apiURL + '/workspace/projectuser';

  isLoadingProjectUser = new BehaviorSubject<boolean>(true);
  projectUser = new BehaviorSubject<UserRole[]>([])

  async updateProjectUser(projectId: number) {
    this.isLoadingProjectUser.next(true);
    this.projectUser.next(await this.getProjectUser(projectId));
    this.isLoadingProjectUser.next(false);
  }

  getProjectUser(projectId: number): Promise<UserRole[]> {
    let retValue = lastValueFrom(this.http.get<Priority>(this.localAPIPath + "/" + projectId)
      .pipe(
        map((priority: any) => {
          // console.log(project);
          return priority.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }
  getExecutorTask(taskId: number): Promise<User[]> {
    let retValue = lastValueFrom(this.http.get<User[]>(this.localAPIPath + "/executorTask/" + taskId)
      .pipe(
        map((priority: any) => {
          // console.log(project);
          return priority.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }
}
