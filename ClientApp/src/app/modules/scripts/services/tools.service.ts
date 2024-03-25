import { Injectable } from "@angular/core";
import { root } from "postcss";
import { BehaviorSubject, catchError, lastValueFrom, map } from "rxjs";
import { Tool } from "src/app/Models/Tool";
import { BaseApiService } from "src/app/services/BaseApiService/base-api.service";


@Injectable({
  providedIn: 'root'
})
export class ToolsService extends BaseApiService{

  localAPIPath = this.apiURL + '/tools';

  tools = new BehaviorSubject<Tool[]>([]);
  selectedtool = new BehaviorSubject<Tool|undefined>(undefined)

  getTools(): Promise<Tool[]> {
    let retValue = lastValueFrom(this.http.get<Tool[]>(this.localAPIPath)
        .pipe(
          map((tool: any) => {
            return tool.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  createTool(body: Tool): Promise<Tool>{
    let retValue = lastValueFrom(
      this.http.post<Tool>(this.localAPIPath, body)
        .pipe(
          map((tool: any) => {
            return tool.data;
          }),
          catchError(this.exceptionService.getErrorHandlerList()))
    )

    return retValue;
  }

}
