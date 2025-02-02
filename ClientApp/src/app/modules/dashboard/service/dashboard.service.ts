import { Injectable } from '@angular/core';
import { lastValueFrom, of } from 'rxjs';
import { MyProject } from 'src/app/Models/MyProject';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  public getMyProjects(): Promise<MyProject[]> {
    return lastValueFrom(of([
      {
        id: 1,
        name: 'First Proj',
        tasks_cnt: 4,
        percent: 57.43
      },
      {
        id: 2,
        name: 'Second Proj',
        tasks_cnt: 17,
        percent: 31.27
      },
      {
        id: 3,
        name: 'Third Proj',
        tasks_cnt: 37,
        percent: 100
      }
    ]))
  }
}
