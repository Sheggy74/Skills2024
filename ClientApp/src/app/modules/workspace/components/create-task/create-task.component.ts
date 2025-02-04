import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { Priority } from 'src/app/Models/Priority';
import { PlanService } from '../../services/plan.service';
import { User } from 'src/app/Models/User';
import { Topics } from 'src/app/Models/Topics';

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
  topics: Topics[] = [];


  ngOnInit() {
    this.workspaceService.priority.subscribe(prioritys => {
      this.prioritys = prioritys;
    })

    this.countWorkDays = this.planService.countWorkDays(new Date().getFullYear(), new Date().getMonth())
    console.log(this.countWorkDays);
    this.planService.userAndPerformers.subscribe(users => {
      this.users = users;
    })
    this.planService.topics.subscribe(topics => {
      this.topics = topics;
    })
  }

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
