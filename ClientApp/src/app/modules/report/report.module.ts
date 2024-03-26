import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ReportComponent } from './pages/report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    ReportRoutingModule,
    TableModule,
    CommonModule,
    ButtonModule,
  ]
})
export class ReportModule { }
