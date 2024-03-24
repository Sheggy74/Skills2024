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
  selectedExperiment = new BehaviorSubject<Experiment|undefined>(undefined);
  isLoading = new BehaviorSubject<boolean>(true);

  async updateData(){
    this.experiments.next(await this.getExperiments());
  }

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

  deleteExperiment(id: number){
    let retValue = lastValueFrom(
      this.http.delete<any>(this.localAPIPath + '/' + id)
        .pipe(
          catchError(this.exceptionService.getErrorHandlerList())
        )
    )

    return retValue;
  }

  editExperiment(id: number, body: Experiment): Promise<any>{
    let retValue = lastValueFrom(
      this.http.put<Experiment>(this.localAPIPath + '/' + id, {
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
