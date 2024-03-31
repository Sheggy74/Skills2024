import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MesComponentsModule } from 'src/app/Shared/MESComponentsModule/mes-components.module';
import { ReportListComponent } from './pages/report-list/report-list.component';
import { ReportComponent } from './pages/report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [
    ReportComponent,
    ReportListComponent,
  ],
  imports: [
    ReportRoutingModule,
    TableModule,
    CommonModule,
    ButtonModule,
    CardModule,
    DividerModule,
    ButtonModule,
    MesComponentsModule,
  ]
})
export class ReportModule { }
