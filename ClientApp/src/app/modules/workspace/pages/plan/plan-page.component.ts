import { Component, inject } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { PlanService } from '../../services/plan.service';


@Component({
  selector: 'app-plan-plage',
  templateUrl: './plan-page.component.html',
  styleUrl: './plan-page.component.css'
})
export class PlanPageComponent {
  workspaceService = inject(WorkspaceService);
  planService = inject(PlanService)
  stateService = inject(StateService)

  userId?: string;
  userAndPerformers: number[] = []

  plans: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  isEditable: boolean = false;

  uiSettings: any[] = [
    {
      name: "123",
      order: [1, 2, 3]
    },
    {
      name: '321',
      order: [3, 2, 1]
    }
  ]

  selectedUiSetting?: any;
  isOrderDialogOpen: boolean = false;

  newOrderName: string = ''

  ngOnInit() {
    this.workspaceService.updatePriority();

    const jwtToken = this.stateService.getCurrentJWT();
    this.userId = jwtToken.user?.id;

    // this.planService.getPerformers(Number.parseInt(this.userId ?? ''));
    this.planService.updateUserAndPerformers(Number.parseInt(this.userId ?? '0'))
    this.planService.updateTopics(Number.parseInt(this.userId ?? '0'));
  }

  // Обработчик события перетаскивания строк
  handleRowReorder(event: any): void {
    // После перетаскивания rows в plans уже будет новый порядок.
    // Создаем массив с объектами вида {id_object: number, index_row: number}
    const orderedData = this.plans.map((item, index) => ({
      id_object: item.id,
      index_row: index
    }));

    // Лог для проверки результата
    console.log('Новый порядок строк:', orderedData);

  }

  setUiSetting(event: any) {
    let order = event.value.order
    this.plans.sort((a: any, b: any) => order.indexOf(a.id) - order.indexOf(b.id))
  }

  saveOrder() {
    this.uiSettings.push({ name: this.newOrderName, order: this.plans.map(item => item.id) })
    this.isOrderDialogOpen = false;
  }

}
