import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Task } from "src/app/Models/Task";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
}
