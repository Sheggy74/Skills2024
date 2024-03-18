import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Experiment } from "src/app/Models/Experiment";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";


@Injectable({
  providedIn: 'root'
})
export class ExperimentsService extends BaseApiService{

  localAPIPath = this.apiURL + '/experiments';

  experiments = new BehaviorSubject<Experiment[]>([]);
  selectedExperiment = new BehaviorSubject<Experiment|undefined>(undefined)

  getExperiments(): Promise<Experiment[]> {
    let retValue = lastValueFrom(this.http.get<Experiment[]>(this.localAPIPath)
        .pipe(
          map((experiment: any) => {
            return experiment.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  createExperiment(body: Experiment): Promise<Experiment>{
    console.log({
      ...body,
      user_id: body.user?.id,
      tool_id: body.tool?.id
    });

    let retValue = lastValueFrom(
      this.http.post<Experiment>(this.localAPIPath, {
        ...body,
        user_id: body.user?.id,
        tool_id: body.tool?.id
      })
        .pipe(
          map((experiment: any) => {
            return experiment.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )

    return retValue;
  }

}
