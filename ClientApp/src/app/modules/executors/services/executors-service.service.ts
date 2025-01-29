import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
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
}
