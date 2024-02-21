import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService : MessageService) {

   }
   show(type : MessageType, summary : string, details : string = ''){
    var severityString = 'info'
    if(type == MessageType.Error){
        severityString = "error"
    }
    if(type == MessageType.Success){
        severityString = "success"
    }
    if(type == MessageType.Warning){
        severityString = "warn"
    }
    this.messageService.add({key: 'global-toast', severity:severityString, summary: summary, detail: details});
   }
}
export enum MessageType{
    Info,
    Success,
    Warning,
    Error
}
