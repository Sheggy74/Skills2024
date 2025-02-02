import { Component, PLATFORM_ID, inject } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-tasks-pie-chart',
  standalone: false,
  templateUrl: './tasks-pie-chart.component.html',
  styleUrl: './tasks-pie-chart.component.css'
})
export class TasksPieChartComponent extends BaseComponent {

  public data: any;

  public options: any;

  private dashboardService = inject(DashboardService)

  constructor() {
    super()
  }

  override async ngOnInit(): Promise<void> {
    let data = await this.dashboardService.getMyTasks()
    this.initChart(data)
  }

  private initChart(data: any) {

    this.data = {
      labels: ['Не выполнено', 'Выполнено'],
      datasets: [
        {
          data: [data.tasks_cnt - data.finished_cnt, data.finished_cnt],
          backgroundColor: ['#36A2EB', '#3FA334'],
          hoverBackgroundColor: ['#36A2EB', '#3FA334']
        }
      ]
    };
    this.options = {
      responsive: true,
      legend: {
        position: 'top'
      }
      // Другие опции
    };
  }
}
