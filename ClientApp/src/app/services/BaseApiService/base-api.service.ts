import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../ErrorService/error.service';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  http: HttpClient
  exceptionService : ErrorService
  apiURL:string
  constructor() {
    this.apiURL = environment.apiURL;
    this.http = inject(HttpClient)
    this.exceptionService = inject(ErrorService)
   }
}
