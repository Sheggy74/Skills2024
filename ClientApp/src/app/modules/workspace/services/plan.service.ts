import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
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

  async updateUserAndPerformers(userId: number) {
    this.userAndPerformers.next(await this.getPerformers(userId));
  }

  async updateTopics() {
    this.topics.next(await this.getTopics());
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

}
