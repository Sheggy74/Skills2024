import { Component, inject } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { PlanService } from '../../services/plan.service';
import { User } from 'src/app/Models/User';
import { AdminModule } from 'src/app/modules/admin/admin.module';


@Component({
  selector: 'app-plan-plage',
  templateUrl: './plan-page.component.html',
  styleUrl: './plan-page.component.css'
})
export class PlanPageComponent {
  workspaceService = inject(WorkspaceService);
  planService = inject(PlanService)
  stateService = inject(StateService)
  isUserCanCreateTask : boolean = false;

  userId?: string;
  user?: User;
  userAndPerformers: User[] = []
  isCanAddTask : boolean = false;

  plans: any[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
  isEditable: boolean = false;

  uiSettings: any[] = []

  selectedUiSetting?: any;
  isOrderDialogOpen: boolean = false;

  newOrderName: string = ''

  async ngOnInit() {
    this.workspaceService.updatePriority();

    const jwtToken = this.stateService.getCurrentJWT();
    this.userId = jwtToken.user?.id;

    // this.planService.getPerformers(Number.parseInt(this.userId ?? ''));
    this.planService.updateUserAndPerformers(Number.parseInt(this.userId ?? '0'))
    this.planService.updateTopics(Number.parseInt(this.userId ?? '0'));

    this.planService.userAndPerformers.subscribe(user => {
      this.userAndPerformers = user;
    })
    this.planService.hasNewTasks.subscribe(res => {
      console.log('RES',res);
      
      this.planService.tasks = res
      .filter((plan: any) => plan.tasks.length > 0)
      .map((plan: any) => {
        return {
          user: plan.user,
          tasks: plan.tasks.sort((a:any, b:any) => (a.priority_id - b.priority_id == 0) ? (a.order_number - b.order_number) : b.priority_id - a.priority_id)
        }
      });
      console.log();
      
    });
    this.planService.getTasks();
    this.user = await this.planService.getUserById(Number.parseInt(this.userId ?? '0'));
    console.log(this.user);
    
    
    this.uiSettings = await this.planService.getOrders();
  }

  // Обработчик события перетаскивания строк
  handleRowReorder(event: any): void {
    // После перетаскивания rows в plans уже будет новый порядок.
    // Создаем массив с объектами вида {id_object: number, index_row: number}
    const orderedData = this.planService.tasks.map((item, index) => ({
      id_object: item.user.id,
      index_row: index
    }));

    // Лог для проверки результата
    console.log('Новый порядок строк:', orderedData);
    // this.planService.saveOrder(orderedData.map(item => item.id_object).join(', '))
  }

  setUiSetting(event: any) {
    let order = event.value.order
    console.log(order);
    
    this.planService.hasNewTasks.next(this.planService.tasks.sort((a: any, b: any) => order.indexOf(a.user.id) - order.indexOf(b.user.id)))
  }

  saveOrder() {
    this.uiSettings.push({ name: this.newOrderName, order: this.planService.tasks.map(item => item.user.id) })
    this.isOrderDialogOpen = false;
    const orderedData = this.planService.tasks.map((item, index) => ({
      id_object: item.user.id,
      index_row: index
    }));
    this.planService.saveOrder(this.newOrderName, orderedData.map(item => item.id_object).join(', '))
  }

}
