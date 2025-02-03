import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Task } from "src/app/Models/Task";
import { Projects } from "src/app/Models/Projects";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";
import { Priority } from "src/app/Models/Priority"
import { State } from "src/app/Models/State";
@Injectable({
  providedIn: 'root'
})
export class WorkspaceService extends BaseApiService {
  localAPIPath = this.apiURL + '/workspace';

  tasks = new BehaviorSubject<Task[]>([]);
  selectedTask = new BehaviorSubject<Task | undefined>(undefined);
  isLoadingTask = new BehaviorSubject<boolean>(true);
  isLoadingProject = new BehaviorSubject<boolean>(true);
  project = new BehaviorSubject<Projects | undefined>(undefined)
  isLoadingPriority = new BehaviorSubject<boolean>(true);
  priority = new BehaviorSubject<Priority[]>([])
  isLoadingState = new BehaviorSubject<boolean>(true);
  state = new BehaviorSubject<State[]>([])
  
  sidebarVisible = new BehaviorSubject<boolean>(false);

  // обновление задач проекта
  async updateData(projectId: number) {
    this.isLoadingTask.next(true);
    this.tasks.next(await this.getTasksForProject(projectId));
    this.isLoadingTask.next(false);  
  }

  // обновление данных проекта
  async updateProjectData(projectId: number) {
    this.isLoadingProject.next(true);
    this.project.next(await this.getProjectData(projectId));
    this.isLoadingProject.next(false);
    // console.log(this.project);
  }

  // обновление выбранной задачи
  async updateSelectedTask(task: Task) {
    this.selectedTask.next(task);
    // console.log(this.project);
  }

  // переключение видимости боковой панели с информацией по задачи
  async openSidebarVisible() {
    this.sidebarVisible.next(true);
    console.log(this.sidebarVisible);
  }

  async closeSidebarVisible() {
    this.sidebarVisible.next(false);
    console.log(this.sidebarVisible);
  }

  async updatePriority(projectId: number) {
    this.isLoadingPriority.next(true);
    this.priority.next(await this.getPriority());
    this.isLoadingPriority.next(false);
  }
  
  async updateState(projectId: number) {
    this.isLoadingPriority.next(true);
    this.priority.next(await this.getPriority());
    this.isLoadingPriority.next(false);
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

  getProjectData(projectId: number): Promise<Projects> {
    let retValue = lastValueFrom(this.http.get<Projects>(this.localAPIPath + "/project/" + projectId)
      .pipe(
        map((project: any) => {
          // console.log(project);
          return project;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  createTask(newTask: Task): Promise<Task> {
    let retValue = lastValueFrom(
      this.http.post<Task>(this.localAPIPath, {
        ...newTask,

      })
        .pipe(
          map((task: any) => {
            return task.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )

    return retValue;
  }

  editTask(taskId: number, updatedTask: Task): Promise<any> {
    let retValue = lastValueFrom(
      this.http.put<Task>(this.localAPIPath + '/' + taskId, {
        ...updatedTask
      })
        .pipe(
          map((task: any) => {
            return task.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )

    return retValue;
  }

  deleteTask(id: number) {
    let retValue = lastValueFrom(
      this.http.delete<any>(this.localAPIPath + '/' + id)
        .pipe(
          catchError(this.exceptionService.getErrorHandlerList())
        )
    )

    return retValue;
  }

  getPriority() :Promise<Priority[]> {
    let retValue = lastValueFrom(this.http.get<Priority>(this.localAPIPath + "/priority" )
    .pipe(
      map((priority: any) => {
        // console.log(project);
        return priority;
      }),
      catchError(this.exceptionService.getErrorHandlerList())));

  return retValue;
  }

  getState() :Promise<State[]> {
    let retValue = lastValueFrom(this.http.get<State>(this.localAPIPath + "/state" )
    .pipe(
      map((priority: any) => {
        // console.log(project);
        return priority;
      }),
      catchError(this.exceptionService.getErrorHandlerList())));

  return retValue;
  }
}
