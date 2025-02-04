<<<<<<< HEAD
import { Component, inject } from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { PlanService } from '../../services/plan.service';

=======
import { Component ,inject} from '@angular/core';
import { TaskWorkService } from '../../services/task-work.service';
>>>>>>> 537eabb5a2d64bc1545bcdf41bb2eba4ae175d45

@Component({
  selector: 'app-plan-plage',
  templateUrl: './plan-page.component.html',
  styleUrl: './plan-page.component.css'
})
export class PlanPageComponent {
<<<<<<< HEAD
  workspaceService = inject(WorkspaceService);
  planService = inject(PlanService)
  stateService = inject(StateService)

  userId? : string;
  userAndPerformers: number[] = []

  ngOnInit() {
    this.workspaceService.updatePriority();

    const jwtToken = this.stateService.getCurrentJWT();
    this.userId = jwtToken.user?.id;
    
    // this.planService.getPerformers(Number.parseInt(this.userId ?? ''));
    this.planService.updateUserAndPerformers(Number.parseInt(this.userId ?? '0'))
    this.planService.updateTopics();
=======
  taskReportService=inject(TaskWorkService);
  date:Date=new Date();
  report(){
    this.taskReportService.reportTaskDate(this.date)
>>>>>>> 537eabb5a2d64bc1545bcdf41bb2eba4ae175d45
  }
}
