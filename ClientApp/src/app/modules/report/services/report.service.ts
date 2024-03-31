import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { DataReport } from "src/app/Models/DataReport";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";


@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseApiService{

  localAPIPath = this.apiURL + '/report/';

  dataReport = new BehaviorSubject<DataReport[]>([]);
  selectedReport = new BehaviorSubject<DataReport|undefined>(undefined);

  getReport(): Promise<DataReport[]> {
    let retValue = lastValueFrom(this.http.get<DataReport[]>(this.localAPIPath+'report')
        .pipe(
          map((report: any) => {
            return report.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  


}
