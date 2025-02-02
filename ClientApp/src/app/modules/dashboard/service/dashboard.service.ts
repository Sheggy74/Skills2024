import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { MyProject } from 'src/app/Models/MyProject';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseApiService {

  constructor() {
    super()
  }

  public getMyProjects(): Promise<MyProject[]> {
    return new Promise(res => {
      this.http.get(this.apiURL + '/dashboard/myprojects').subscribe((resp: any) => {
        res(resp.map((item: any) => {
          return {
            id: 1, name: item.name, tasks_cnt: item.total_cnt, percent: item.finished_cnt / item.total_cnt * 100
          }
        }))
      })
    })
  }

  public getMyTasks(): Promise<any[]> {
    return new Promise(res => {
      this.http.get(this.apiURL + '/dashboard/mytasks').subscribe((resp: any) => {
        res(resp.map((item: any) => {
          return {
            tasks_cnt: item.total_cnt, finished_cnt: item.finished_cnt
          }
        })[0])
      })
    })
  }

  public getSpentTime(): Promise<any> {
    return new Promise(res => {
      this.http.get(this.apiURL + '/dashboard/spenttime').subscribe((resp: any) => {
        res(resp.map((item: any) => {
          return {
            name: item.name,
            time_spent: item.time_spent
          }
        }))
      })
    })
  }
}
