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

  userId? : string;
  userAndPerformers: number[] = []

  ngOnInit() {
    this.workspaceService.updatePriority();

    const jwtToken = this.stateService.getCurrentJWT();
    this.userId = jwtToken.user?.id;
    
    // this.planService.getPerformers(Number.parseInt(this.userId ?? ''));
    this.planService.updateUserAndPerformers(Number.parseInt(this.userId ?? '0'))
    this.planService.updateTopics();
  }
}
