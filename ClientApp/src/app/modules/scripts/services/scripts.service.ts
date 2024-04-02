import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Script } from "src/app/Models/Script";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";


@Injectable({
  providedIn: 'root'
})
export class ScriptsService extends BaseApiService{
  // async getUsers(): Promise<Person[]> {
  //   var observable = this.http.get<Person[]>(this.APIUrl + '/admin/all')
  //   .pipe(catchError(this.errorService.errorHandlerList));

  //   var retValue = await lastValueFrom(observable);
    
  //   return retValue;
  // }
  localAPIPath = this.apiURL + '/scripts';

  scripts = new BehaviorSubject<Script[]>([]);
  selectedScript = new BehaviorSubject<Script|undefined>(undefined);
  isLoading = new BehaviorSubject<boolean>(true);

  async updateData(){
    this.scripts.next(await this.getExperiments());
  }

  getExperiments(): Promise<Script[]> {
    let retValue = lastValueFrom(this.http.get<Script[]>(this.localAPIPath)
        .pipe(
          map((script: any) => {
            return script.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  createScript(body: Script): Promise<Script>{
    let retValue = lastValueFrom(
      this.http.post<Script>(this.localAPIPath, {
        ...body,
        textscript: body.textscript, scripttype: body.scripttype?.id
      })
        .pipe(
          map((script: any) => {
            return script.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )

    return retValue;
  }



}
