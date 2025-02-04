import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map ,lastValueFrom} from 'rxjs';
import { EventCalendar } from 'src/app/Models/EventCallendar';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskClndService extends BaseApiService{

  localApiPath = this.apiURL + '/workspace';
  
}
