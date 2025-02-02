import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-my-analytics',
  standalone: false,
  templateUrl: './my-analytics.component.html',
  styleUrl: './my-analytics.component.css'
})
export class MyAnalyticsComponent extends BaseComponent {

  public myresults: any;
  public options: any;

  constructor() {
    super()
  }

  override ngOnInit(): void {
    this.myresults = {
      labels: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль'],
      datasets: [
        {
          label: 'Первый набор данных',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#42A5F5',
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
