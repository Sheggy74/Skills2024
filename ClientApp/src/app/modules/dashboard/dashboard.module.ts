import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MyProjectsComponent } from './pages/dashboard/my-projects/my-projects.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TasksPieChartComponent } from './pages/dashboard/tasks-pie-chart/tasks-pie-chart.component';
import { MyTimeUsageComponent } from './pages/dashboard/my-time-usage/my-time-usage.component';
import { MyNotificationsComponent } from './pages/dashboard/my-notifications/my-notifications.component';
import { MyChatComponent } from './pages/dashboard/my-chat/my-chat.component';
import { MyAnalyticsComponent } from './pages/dashboard/my-analytics/my-analytics.component';
import { ChartModule } from 'primeng/chart'


@NgModule({
  declarations: [
    DashboardComponent,
    MyProjectsComponent,
    TasksPieChartComponent,
    MyTimeUsageComponent,
    MyNotificationsComponent,
    MyChatComponent,
    MyAnalyticsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TableModule,
    CheckboxModule,
    // ChartModule
  ]
})
export class DashboardModule { }
