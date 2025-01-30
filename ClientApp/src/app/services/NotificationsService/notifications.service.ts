import { Injectable } from '@angular/core';
import { BaseApiService } from '../BaseApiService/base-api.service';
import { Notifications } from 'src/app/Models/Notifications';
import { BehaviorSubject, catchError, lastValueFrom, map,Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService extends BaseApiService{

  localApiPath=this.apiURL + '/notifications';
  
  notifications=new BehaviorSubject<Notifications[]>([]);
  selectedNotification=new BehaviorSubject<Notifications|undefined>(undefined);

  async updateData(){
    this.notifications.next(await this.getNotifications());
  }

  getNotifications():Promise<Notifications[]>{
    let retValue = lastValueFrom(this.http.get<Notifications[]>(this.localApiPath)
      .pipe(
        map((notifications:any)=>{
          return notifications.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }

  getNotificationID(id:number):Promise<Notifications[]>{
    let retValue = lastValueFrom(this.http.get<Notifications[]>(this.localApiPath + '/' + id)
      .pipe(
        map((notifications:any)=>{
          this.notifications.next(notifications.data);
          return notifications.data;
        }),
        catchError(this.exceptionService.getErrorHandlerList())));
    return retValue;
  }

createNotification(body:Notifications):Promise<Notifications>{
    let retValue=lastValueFrom(
      this.http.post<Notifications>(this.localApiPath,{
        // ...body,
        user_id:body.user_id,
        message:body.message,
        is_read:body.is_read
      }).
        pipe(
         map((notifications:any)=>{
          return notifications.data;
         }),
         catchError(this.exceptionService.getErrorHandlerList()))
    )
    return retValue;
  }
  editNotification(body:Notifications):Promise<Notifications>{
    let retValue=lastValueFrom(
      this.http.put<Notifications>(this.localApiPath+'/'+body.id,{
        ...body,
        id:body.id,
        user_id:body.user_id,
        message:body.message,
        is_read:body.is_read
      }).
        pipe(
         map((notifications:any)=>{
          return notifications.data;
         }),
         catchError(this.exceptionService.getErrorHandlerList()))
    )
    return retValue;
  }

  deleteNotification(id:number){
    let retValue=lastValueFrom(
      this.http.delete<any>(this.localApiPath+'/'+id)
        .pipe(
          catchError(this.exceptionService.getErrorHandlerList())
        )
    );
    return retValue;
  }
}
