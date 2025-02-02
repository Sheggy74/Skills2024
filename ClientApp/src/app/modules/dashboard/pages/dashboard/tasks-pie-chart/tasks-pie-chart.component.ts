import { Component, PLATFORM_ID, inject } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-tasks-pie-chart',
  standalone: false,
  templateUrl: './tasks-pie-chart.component.html',
  styleUrl: './tasks-pie-chart.component.css'
})
export class TasksPieChartComponent extends BaseComponent {

  public data: any;

  public options: any;

  constructor() {
    super()
  }

  override ngOnInit(): void {
    this.initChart()
  }

  private initChart() {
    this.data = {
      labels: ['Красный', 'Синий', 'Жёлтый'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
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
