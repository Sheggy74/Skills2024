import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { DashboardService } from '../../../service/dashboard.service';

export interface MyMessage {
  name: string,
  type: number,
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
  private dashboardService: DashboardService = inject(DashboardService)

  constructor() {
    super()
  }

  override async ngOnInit(): Promise<void> {
    // this.messages = [
    //   {
    //     message: "Правки выполнил",
    //     project: "Проект №1",
    //     created_at: new Date(),
    //     created_by: "Иванов И.И."
    //   },
    //   {
    //     message: "Принял",
    //     project: "Проект №1",
    //     created_at: new Date(),
    //     created_by: "Путин В.В."
    //   }
    //
    // ]
    this.messages = await this.dashboardService.getMyChat()
  }

}
