import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { EOF } from '@angular/compiler';
import { inject, Injectable } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject, catchError, lastValueFrom, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogService } from '../log/log.service';
import { MessageType, ToastService } from '../ToastService/toast.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    http = inject(HttpClient)
    toastService = inject(ToastService)
    logger = inject(LogService)
    observableException: BehaviorSubject<HttpErrorResponse | undefined> = new BehaviorSubject<HttpErrorResponse | undefined>(undefined);
    error: HttpErrorResponse | undefined;
    overlayError: string = '';
    errorOverlay : OverlayPanel | undefined
    constructor() {

    }
    setOverlay(overlay : OverlayPanel){
        this.errorOverlay = overlay
    }
    getErrorHandlerList(event : PointerEvent | undefined = undefined){
        return (error: any) => {
            this.handleError(error,event);
            return of([]);
        }
    }
    getErrorHandlerSingleObject(event : PointerEvent | undefined = undefined){
        return (error: any) => {
            this.handleError(error,event);
    
            return of({});
        }
    }
    getErrorHandlerNumber = (event : PointerEvent | undefined = undefined) => {
        return (error: any) => {
            this.handleError(error,event);
    
            return of(-1);
        }
    }
    getErrorHandlerString = (event : PointerEvent | undefined = undefined) => {
        return (error: any) => {
            this.handleError(error,event);
    
            return of("");
        }
    }
    getErrorHandleErrorString = (event : PointerEvent | undefined = undefined, handleError : boolean = true) => {
        return (error: any) => {
            if (handleError){
                this.handleError(error,event);
            }            
    
            return of(error.error);
        }
    }
    
    getErrorHandlerBoolean = (event : PointerEvent | undefined = undefined) => {
        return (error: any) => {
            this.handleError(error,event);
            return of(false);
        }
    }
    showErrorOnOverlay(message : string, event : any){
        this.overlayError = message
        this.errorOverlay?.show(event)
    }
    handleError(error: HttpErrorResponse, event : PointerEvent | undefined) {
        this.error = error
        var messageToShow = ''
        // Display in overlay
        if(this.error.status >= 430 && this.error.status < 500 && event != undefined){
            this.overlayError =  this.error.error
            this.errorOverlay?.show(event)
            return
        }

        console.debug("asdf",error)
        // Display through toast service
        var code = this.error?.status.toString() != null ? this.error?.status.toString() : ''
        messageToShow = code + ' ' + this.error.error
        
        this.error = error;
        this.toastService.show(MessageType.Error, messageToShow)
        this.observableException.next(error);

        this.logger.error(error.error)
    }
}
