import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { Priority } from 'src/app/Models/Priority';
import { PlanService } from '../../services/plan.service';
import { User } from 'src/app/Models/User';
import { Topics } from 'src/app/Models/Topics';
import { StateService } from 'src/app/services/StateService/state.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output() createTask = new EventEmitter<Task>();
  @Output() visibleChange = new EventEmitter<boolean>();
  private workspaceService = inject(WorkspaceService);
  private stateService = inject(StateService);
  private planService = inject(PlanService);

  visible: boolean = false;
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  newTaskTopicId?: Topics;
  newTaskPerformer?: User;
  newTaskDays?: number;
  prioritys: Priority[] = [];
  newTaskPriorityId: number = 0;
  newTaskDeadline?: Date;
  countWorkDays: number = 0;
  users: User[] = [];
  topics: Topics[] = [];
  tasks: Task[] = [];
  newTask: Task = {
    id: 0,
    name: '',
  }
  managerId: number = 0;
  userId: number = 0;
  isPlanTask: boolean = false;
  workload: number = 0;
  isLoading: boolean = false;


  async ngOnInit() {
    this.isLoading = true;
    this.workspaceService.priority.subscribe(prioritys => {
      this.prioritys = prioritys;
    })

    this.countWorkDays = this.planService.countWorkDays(new Date().getFullYear(), new Date().getMonth())
    // this.planService.userAndPerformers.subscribe(users => {
    //   this.users = users;
    // })
    this.planService.topics.subscribe(topics => {
      this.topics = topics;
      
    })
    this.cols = [
      { field: 'name', header: 'Название' },
      { field: 'topicName', header: 'Тематика' },
    ];
    
    this.managerId = await this.planService.getManager();
    const jwtToken = this.stateService.getCurrentJWT();
    this.userId = Number.parseInt(jwtToken.user?.id ?? '');
    this.users = await this.planService.getPerformers(this.userId);            
    this.isLoading = false;
  }

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit() {
    console.log(this.newTask);

    this.newTask.userId = Number.parseFloat(this.newTaskPerformer?.id ?? '');
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === this.newTask.id){
        this.newTask.orderNumber = i;
      }

    }
    this.newTask.newOrder = this.tasks.map((el,index) => {
      return {id: el.id, orderNumber: index};
    })
    this.workspaceService.createTask(this.newTask);
    this.newTask = {
      id: 0,
      name: '',
    }
    this.planService.getTasks()
    this.tasks = [];
    this.hideDialog();
  }

  cols: any[] = [];

  async changePerformer() {
    this.planService.updateTopics(Number.parseInt(this.newTaskPerformer?.id ?? ''))
    console.log(this.topics);
    this.tasks = (await this.planService.getTasksForUser(Number.parseInt(this.newTaskPerformer?.id ?? '')))
    this.newTask.topicName = this.newTask.topic?.name ?? '';
    if (this.newTaskPerformer?.id)
      this.workload = await this.planService.getWorkloadUser(Number.parseInt(this.newTaskPerformer?.id ?? '0'));
    console.log(this.tasks);
    
    this.tasks.push(this.newTask)
    this.tasks = this.tasks.filter(el => {
      return el.priorityId === this.newTask.priorityId;
    })
    console.log(this.tasks);
  }

  async changeTaskType() {
    if (this.isPlanTask) {
      this.isLoading = true;
      this.users = await this.planService.getAllPerformers(this.userId);
      this.isLoading = false;
    }
    else {
      this.isLoading = true;
      this.users = await this.planService.getPerformers(this.userId);
      this.isLoading = false;
    }
  }
}
