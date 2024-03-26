import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { ReportService } from '../services/report.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css'],

})
export class ReportComponent extends BaseComponent{
    reportService = inject(ReportService);
    excelReportLink:string='http://127.0.0.1:8000/api/auth/report';
    override async ngOnInit() {
        super.ngOnInit();
       
        this.reportService.dataReport.next(await this.reportService.getDataReport());
        console.log(this.reportService);
    }
}
