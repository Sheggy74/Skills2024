import { Injectable } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { BaseApiService } from '../BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class BlockService extends BaseApiService{

    localAPIPath = this.apiURL + "/default/"
  
    blockObject(id : string, event : any = undefined, defaultHandleError = true): Promise<string>{
        var returnValue =  lastValueFrom(this.http.post<string>(this.localAPIPath + "blockObject/" + id,{})
        .pipe(catchError(this.exceptionService.getErrorHandleErrorString(event,defaultHandleError))));

        return returnValue
    }
    // returns null of ok
    blockSeveralObjects(ids : string[], event : any = undefined, defaultHandleError = true): Promise<BlockMessage>{
        var returnValue =  lastValueFrom(this.http.post<BlockMessage>(this.localAPIPath + "blockSeveralObjects", ids)
        .pipe(catchError(this.getErrorHandleMultiple(event, defaultHandleError))));

        return returnValue
    }
    unblockSeveralObjects(ids : string[], event : any = undefined, defaultHandleError = true): Promise<BlockMessage>{
        var returnValue =  lastValueFrom(this.http.post<BlockMessage>(this.localAPIPath + "unblockSeveralObjects", ids)
        .pipe(catchError(this.getErrorHandleMultiple(event, defaultHandleError))));

        return returnValue
    }
    unblockObject(id : string, event : any = undefined, defaultHandleError = true) : Promise<string>{
        var returnValue =  lastValueFrom(this.http.post<string>(this.localAPIPath + "unblockObject/" + id,{})
        .pipe(catchError(this.exceptionService.getErrorHandleErrorString(event,defaultHandleError))));

        return returnValue
    }

    getErrorHandleMultiple = (event : PointerEvent | undefined = undefined, handleError : boolean = true) => {
        return (error: any) => {
            let copyErrorMessage = structuredClone(error.error)
            error.error = error.error.errorMessage
            this.exceptionService.handleError(error, event)
    
            return of(copyErrorMessage);
        }
    }
}
export interface BlockMessage{
    errorMessage? : string
    errorOrder? : string
}
