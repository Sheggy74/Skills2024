import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { JwtService } from 'src/app/services/JWTService/jwt.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { Priority } from 'src/app/Models/Priority';
import { UserRole } from 'src/app/Models/UserRole';
import { User } from 'src/app/Models/User';
import { ProjectUserService } from '../../services/project-user.service';
import { ProjectService } from 'src/app/modules/project/services/project.service';
import { MenuItem } from 'primeng/api';
import { TaskClndService } from '../../services/task-clnd.service';
import { Projects } from 'src/app/Models/Projects';


interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  cols: Column[] = [];
  _selectedColumns: Column[] = [];

  tasks: Task[] = [];
  prioritys: Priority[] = [];
  projectUsers: UserRole[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  projectId: number = 0;
  projectName: string = "";
  project: any;
  userRoleId: string | undefined;
  isManagerOrAdmin: boolean = false;
  isLoadingProject: boolean = false;
  isLoadingTask: boolean = false;
  isLoadingPriority: boolean = false;
  isLoadingProjectUser: boolean = false;
  isOnlyExecutorsTasks: boolean = true;
  isSidebarVisible: boolean = false;  

  private workspaceService = inject(WorkspaceService);
  private jwtService = inject(JwtService);
  private stateService = inject(StateService)
  private projectUserService = inject(ProjectUserService)
  projectService = inject(ProjectService)
  taskClndService=inject(TaskClndService);
  constructor(private route: ActivatedRoute) { }  
  priorityName: string = ""
  items!: MenuItem[] ;
  activeItem!: MenuItem ;
  visibleClnd:boolean=false;
  editSidebarVisible: boolean = false;

  async ngOnInit(): Promise<void> {
    this.cols = [
      { field: 'name', header: 'Название' },
      { field: 'state', header: 'Состояние' },
      { field: 'executors', header: 'Исполнители' },
      { field: 'priority', header: 'Приоритет' },
      { field: 'deadlines', header: 'Дедлайн' },
    ]

    this._selectedColumns = this.cols;
    this.workspaceService.isLoadingProject.subscribe(value => {
      this.isLoadingProject = value;
    })
    this.workspaceService.isLoadingTask.subscribe(value => {
      this.isLoadingTask = value;
    })

    this.workspaceService.isLoadingPriority.subscribe(value => {
      this.isLoadingPriority = value;
    })

    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    ).subscribe(data => this.projectId = +data);


    this.workspaceService.updateProjectData(this.projectId);
    this.workspaceService.project.subscribe(project => {
      this.project = project!;
      this.projectName = project?.name || '';
    })


    this.workspaceService.updateData(this.projectId)
    this.workspaceService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    })

    this.workspaceService.updatePriority(this.projectId)
    this.workspaceService.priority.subscribe(priority => {
      this.prioritys = priority;
      console.log(this.prioritys);
      
    })

    this.projectUserService.updateProjectUser(this.projectId)
    this.projectUserService.projectUser.subscribe(projectUsers => {
      this.projectUsers = projectUsers;
    })


    const jwtToken = this.stateService.getCurrentJWT();
    this.userRoleId = jwtToken.roles?.pop()?.id;
    this.isManagerOrAdmin = this.userRoleId == '1' || this.userRoleId == '2' ? true : false;
    this.taskClndService.getTasks(this.projectId);

    this.items = [
      { label: 'Таблица', icon: 'pi pi-table' ,command:()=>{this.visibleClnd=false;}},
      { label: 'Календарь', icon: 'pi pi-calendar',command:()=>{this.visibleClnd=true;}
      // command:()=>{this.taskClndService.getTasks(this.projectId)} 
    },
  ];

  this.activeItem = this.items[0];
  }

  async addTask(newTask: Task) {
    this.tasks.push(newTask);
    console.log(newTask);
    
  }

  async removeTask(taskId: number) {
    this.workspaceService.deleteTask(taskId);
    await this.workspaceService.updateData(7);
    this.tasks = this.workspaceService.tasks.value;
  }

  async changeTask(updatedTask: Task) {
    this.workspaceService.editTask(updatedTask.id, updatedTask);
    await this.workspaceService.updateData(7);
    this.tasks = this.workspaceService.tasks.value;
    this.editSidebarVisible = false;
  }

  getSeverityForTag(priorityId: number) : "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch(priorityId) {
      case 1: {return 'success';}
      case 2: {return 'info';}
      case 3: {return 'warning';}
      case 4: {return 'danger';}
      default: return undefined;
    }
  }

  getPerformersTask(taskId:number) : number[] {
    console.log(this.projectUserService.getExecutorTask(taskId));
    return [1,2,3,4]
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
}

}
