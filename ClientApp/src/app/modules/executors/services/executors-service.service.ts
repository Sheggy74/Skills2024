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

  constructor() {
    super()
  }

  public getExecutors(): Promise<User[]> {
    let res = lastValueFrom(this.http.get<User[]>(this.apiURL + '/executors')
      .pipe(map((item: any) => { return item.data })))
      .catch(this.exceptionService.getErrorHandlerList())
    return res;
  }
}
