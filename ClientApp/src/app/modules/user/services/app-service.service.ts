import { Injectable } from '@angular/core';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService extends BaseApiService{
  localAPIPath = this.apiURL + `/user/newapplication/`

}
