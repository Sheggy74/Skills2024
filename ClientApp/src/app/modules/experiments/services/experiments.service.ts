import { Injectable } from "@angular/core";
import { root } from "postcss";
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
    var retValue = lastValueFrom(this.http.get<Experiment[]>(this.localAPIPath)
        .pipe(
          map((experiment: any) => {
            return experiment.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
}

}
