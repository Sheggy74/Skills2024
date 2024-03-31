import { Component, inject } from '@angular/core';
import { DataReport } from 'src/app/Models/DataReport';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { environment } from '../../../../../environments/environment';
import { ReportService } from '../../services/report.service';

@Component({
    selector: 'report-list',
    templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.css'],

})
export class ReportListComponent extends BaseComponent{
    reportService = inject(ReportService);
    selectedReport:DataReport|undefined;
    excelReportLink:string=environment.apiURL+'/report/1';
    override async ngOnInit() {
        super.ngOnInit();
        this.reportService.dataReport.next(await this.reportService.getReport());
    }
}
