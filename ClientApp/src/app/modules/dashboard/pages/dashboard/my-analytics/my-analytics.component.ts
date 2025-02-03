import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { DashboardService } from '../../../service/dashboard.service';

@Component({
  selector: 'app-my-analytics',
  standalone: false,
  templateUrl: './my-analytics.component.html',
  styleUrl: './my-analytics.component.css'
})
export class MyAnalyticsComponent extends BaseComponent {

  public myresults: any;
  public options: any;

  private dashboardService: DashboardService = inject(DashboardService)

  constructor() {
    super()
  }

  override async ngOnInit(): Promise<void> {
    let data = await this.dashboardService.getMyResults()
    this.myresults = {
      labels: data.map((item: any) => item.month),
      datasets: [
        {
          label: 'Всего заданий',
          data: data.map((item: any) => item.total_cnt),
          fill: false,
          borderColor: '#42A5F5',
          tension: 0.4
        },
        {
          label: 'Выполнено заданий',
          data: data.map((item: any) => item.completed_cnt),
          fill: false,
          borderColor: '#42A545',
          tension: 0.4
        },
        {
          label: 'Заданий в работе',
          data: data.map((item: any) => item.inprogress_cnt),
          fill: false,
          borderColor: '#F2F565',
          tension: 0.4
        }

      ]
    };
    this.options = {
      responsive: false,
      maintainAspectRatio: true,  // отключает автоматическое сохранение соотношения сторон
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  }

}
