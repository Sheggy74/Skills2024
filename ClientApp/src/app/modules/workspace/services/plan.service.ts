import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, last, lastValueFrom, map, Observable, Subject } from "rxjs";
import { Task } from "src/app/Models/Task";
import { Projects } from "src/app/Models/Projects";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";
import { Priority } from "src/app/Models/Priority"
import { State } from "src/app/Models/State";
import { use } from "echarts";
import { User } from "src/app/Models/User";
import { Topics } from "src/app/Models/Topics";

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseApiService {
  localApiPath = this.apiURL + '/plan';

  userAndPerformers = new BehaviorSubject<User[]>([]);
  loadingUsers = new BehaviorSubject<boolean>(false);
  topics = new BehaviorSubject<Topics[]>([]);
  tasks: any[] = []; 

  hasNewTasks: BehaviorSubject<any> = new BehaviorSubject([])

  async updateUserAndPerformers(userId: number) {
    this.userAndPerformers.next(await this.getPerformers(userId));
  }

  async updateTopics(userId: number) {
    this.topics.next(await this.getTopicsUser(userId));
    // this.topics.next(await this.getTopics());
  }

  getTasksForUser(userId: number): Promise<Task[]> {
    let retValue = lastValueFrom(this.http.get<Task[]>(this.localApiPath + "/" + userId)
      .pipe(
        map((tasks: any) => {
          // console.log(tasks.data);
          return tasks.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }


  countWorkDays(year: number, month: number): number {
    // Получаем количество дней в месяце
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let weekdayCount = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay(); // 0 - воскресенье, 1 - понедельник, ..., 6 - суббота
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Пн-Пт
        weekdayCount++;
      }
    }
    return weekdayCount;
  }

  getPerformers(userId: number): Promise<User[]> {
    let retValue = lastValueFrom(this.http.get<User[]>(this.localApiPath + "/users/" + userId)
      .pipe(
        map((users: any) => {
          // console.log(tasks.data);
          return users.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  getAllPerformers(userId: number): Promise<User[]> {
    let retValue = lastValueFrom(this.http.get<User[]>(this.localApiPath + "/allperformers/" + userId)
      .pipe(
        map((users: any) => {
          // console.log(tasks.data);
          return users.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  getTopics() : Promise<Topics[]> {
    let retValue = lastValueFrom(this.http.get<User[]>(this.localApiPath + "/topics")
      .pipe(
        map((topics: any) => {
          // console.log(tasks.data);
          return topics.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  getTopicsUser(userId: number) : Promise<Topics[]> {
    let retValue = lastValueFrom(this.http.get<Topics[]>(this.localApiPath + "/topics/" + userId)
      .pipe(
        map((topics: any) => {
          // console.log(tasks.data);
          return topics.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }


  getTasks()  {    
    this.http.get<any>(this.apiURL + '/plan/tasks').subscribe(
      
      (res: any) => {this.hasNewTasks.next(res)}
    )
      
  }

  getManager() : Promise<number> {
    let retValue = lastValueFrom(this.http.get<Topics[]>(this.localApiPath + "/manager")
    .pipe(
      map((manager: any) => {
        // console.log(tasks.data);
        return manager;
      }),
      catchError(this.exceptionService.getErrorHandlerList())));

  return retValue;  
  }

  getWorkloadUser(userId: number) : Promise<number> {
    let retValue = lastValueFrom(this.http.get<Topics[]>(this.localApiPath + "/workload/" + userId)
    .pipe(
      map((workload: any) => {
        // console.log(tasks.data);
        return workload;
      }),
      catchError(this.exceptionService.getErrorHandlerList())));

  return retValue;  
  }

  saveOrder(name:string, order: string) : Promise<any> {
    return lastValueFrom(this.http.post<any>(this.apiURL + '/plan/order',{order: order, name: name}));
  }

  getOrders() : Promise<any> {
    return lastValueFrom(this.http.get<any>(this.apiURL + '/plan/orders'));
  }

  getUserById(userId: number) : Promise<User> {
    let retValue = lastValueFrom(this.http.get<Topics[]>(this.localApiPath + "/userdata/" + userId)
    .pipe(
      map((user: any) => {
        // console.log(tasks.data);
        return user;
      }),
      catchError(this.exceptionService.getErrorHandlerList())));

  return retValue;  
  }
}
