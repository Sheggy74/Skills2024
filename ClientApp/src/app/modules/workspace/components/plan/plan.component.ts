import { Component, inject, Input } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
  @Input() userId: number = 0;
  @Input() tasks: Task[] = [];
  planService = inject(PlanService)

  async ngOnInit() {
    //this.tasks = await this.planService.getTasksForUser(this.userId);
    console.log(this.tasks);
    
  }

}
