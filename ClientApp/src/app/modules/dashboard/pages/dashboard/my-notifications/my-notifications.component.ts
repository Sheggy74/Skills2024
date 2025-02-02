import { Component } from '@angular/core';
import { now } from 'cypress/types/lodash';
import { Notifications } from 'src/app/Models/Notifications';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-my-notifications',
  standalone: false,
  templateUrl: './my-notifications.component.html',
  styleUrl: './my-notifications.component.css'
})
export class MyNotificationsComponent extends BaseComponent {

  public notifications: Notifications[] = [];

  constructor() {
    super()
  }

  override ngOnInit(): void {
    this.notifications = [
      {
        id: 1,
        message: "Вы назначены на проект проект",
        created_at: new Date()
      },
      {
        id: 2,
        message: "Вы назначены исполнителем задачи НАЗВАНИЕ ЗАДАЧИ",
        created_at: new Date()
      },
    ]
  }

}
