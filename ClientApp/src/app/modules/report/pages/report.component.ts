import { Component, inject } from '@angular/core';
import { DataReport } from 'src/app/Models/DataReport';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { environment } from '../../../../environments/environment';
import { ReportService } from '../services/report.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],

})
export class ReportComponent extends BaseComponent{
    reportService = inject(ReportService);
    public report?:DataReport=undefined;
    excelReportLink:string=environment.apiURL+'/report/1';
    override async ngOnInit() {
        super.ngOnInit();
        this.reportService.dataReport.next(await this.reportService.getReport());
        this.reportService.selectedReport.subscribe(res=>{
            this.report=res;
        });
    }
    toExcel(){
        window.open(environment.apiURL+'/report/'+this.reportService.selectedReport.value?.id,'_self');
    }

}
