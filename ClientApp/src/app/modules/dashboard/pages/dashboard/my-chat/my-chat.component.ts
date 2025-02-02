import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

export interface MyMessage {
  project: string,
  message: string,
  created_at: Date,
  created_by: string
}

@Component({
  selector: 'app-my-chat',
  standalone: false,
  templateUrl: './my-chat.component.html',
  styleUrl: './my-chat.component.css'
})
export class MyChatComponent extends BaseComponent {

  public messages: MyMessage[] = []

  constructor() {
    super()
  }

  override ngOnInit(): void {
    this.messages = [
      {
        message: "Правки выполнил",
        project: "Проект №1",
        created_at: new Date(),
        created_by: "Иванов И.И."
      },
      {
        message: "Принял",
        project: "Проект №1",
        created_at: new Date(),
        created_by: "Путин В.В."
      }

    ]
  }

}
