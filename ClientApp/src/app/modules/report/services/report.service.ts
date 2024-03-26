import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { DataReport } from "src/app/Models/DataReport";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";


@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseApiService{

  localAPIPath = this.apiURL + '/auth/';

  dataReport = new BehaviorSubject<DataReport[]>([]);
  selectedExperiment = new BehaviorSubject<DataReport|undefined>(undefined)

  getDataReport(): Promise<DataReport[]> {
    let retValue = lastValueFrom(this.http.get<DataReport[]>(this.localAPIPath+'data')
        .pipe(
          map((report: any) => {
            return report;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  


}
