import { Component ,inject} from '@angular/core';
import { TaskWorkService } from '../../services/task-work.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan-page.component.html',
  styleUrl: './plan-page.component.css'
})
export class PlanPageComponent {
  taskReportService=inject(TaskWorkService);
  date:Date=new Date();
  report(){
    this.taskReportService.reportTaskDate(this.date)
  }
}
