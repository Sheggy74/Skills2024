import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

export interface MyTaskTimeUsage {
  name: string,
  time_usage: number
}


@Component({
  selector: 'app-my-time-usage',
  standalone: false,
  templateUrl: './my-time-usage.component.html',
  styleUrl: './my-time-usage.component.css'
})
export class MyTimeUsageComponent extends BaseComponent {

  public tasks: MyTaskTimeUsage[] = [];

  constructor() {
    super()
  }

  override ngOnInit(): void {
    this.tasks = [
      {
        name: 'First Task',
        time_usage: 765.43
      },
      {
        name: 'Second Task',
        time_usage: 265.15
      }
    ]
  }

}
