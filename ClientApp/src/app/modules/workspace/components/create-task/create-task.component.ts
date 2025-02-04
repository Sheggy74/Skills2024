import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { Priority } from 'src/app/Models/Priority';
import { PlanService } from '../../services/plan.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output() createTask = new EventEmitter<Task>();
  @Output() visibleChange = new EventEmitter<boolean>();
  private workspaceService = inject(WorkspaceService);
  private planService = inject(PlanService);

  visible: boolean = false;
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskTopicId?: number;
  newTaskPerformer?: any;
  newTaskDays?: number;
  prioritys: Priority[] = [];
  newTaskPriorityId: number = 0;
  newTaskDeadline?: Date;
  countWorkDays: number = 0;
  users: User[] = [];


  ngOnInit() {
    this.workspaceService.priority.subscribe(prioritys => {
      this.prioritys = prioritys;
    })

    this.countWorkDays = this.planService.countWorkDays(new Date().getFullYear(), new Date().getMonth())
    console.log(this.countWorkDays);
    this.planService.userAndPerformers.subscribe(users => {
      this.users = users;
    })
  }

  Topics: any[] = [
    {
      id: 1,
      name: 'Бюджетирование'
    },
    {
      id: 2,
      name: 'Финансовая отчетность'
    },
    {
      id: 3,
      name: 'Управление денежными средствами'
    },
    {
      id: 4,
      name: 'Налоговое планирование и отчетность'
    },
    {
      id: 5,
      name: 'Финансовый анализ и прогнозирование'
    },
  ]

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit() {
    if (this.newTaskTitle.trim() !== '') {
      const newTask: Task = {
        id: 0,
        name: this.newTaskTitle,
        description: this.newTaskDescription,
        userId: this.newTaskPerformer.id,
        days: this.newTaskDays,
        priorityId: this.newTaskPriorityId,
        topicId: this.newTaskTopicId,
      };
      // this.createTask.emit(newTask); 
      this.workspaceService.createTask(newTask)
      this.hideDialog();
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    }
  }
}
