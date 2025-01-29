import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { Projects } from 'src/app/Models/Projects';
import { Task } from 'src/app/Models/Task';
import { User } from 'src/app/Models/User';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';
import { ErrorService } from 'src/app/services/ErrorService/error.service';

@Injectable({
  providedIn: 'root'
})
export class ExecutorsService extends BaseApiService {

  public executors: User[] = [];
  public selectedExecutor?: User

  constructor() {
    super()
  }

  public async getExecutors(): Promise<void> {
    await lastValueFrom(this.http.get<User[]>(this.apiURL + '/executors')
      .pipe(map((item: any) => { this.executors = item.data })))
      .catch(this.exceptionService.getErrorHandlerList())
  }

  public selectExecutor(executor: User) {
    this.selectedExecutor = executor;
  }

  public async getProjects(): Promise<Projects[]> {
    return await lastValueFrom(this.http.get<Projects[]>(this.apiURL + '/projects')
      .pipe(map((item: any) => item.data)))
      .catch(this.exceptionService.getErrorHandlerList())
  }

  public async getTasks(project: Projects): Promise<Task[]> {
    return await lastValueFrom(this.http.get<Task[]>(this.apiURL + '/workspace/' + project.id)
      .pipe(map((item: any) => item.data)))
      .catch(this.exceptionService.getErrorHandlerList())
  }

}
