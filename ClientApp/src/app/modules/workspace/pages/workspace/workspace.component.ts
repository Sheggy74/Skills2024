import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { JwtService } from 'src/app/services/JWTService/jwt.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { Priority } from 'src/app/Models/Priority';
import { UserRole } from 'src/app/Models/UserRole';
import { ProjectUserService } from '../../services/project-user.service';
import { ProjectService } from 'src/app/modules/project/services/project.service';

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
  constructor(private route: ActivatedRoute) { }  
  priorityName: string = ""

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
      console.log(this.projectUsers);
    })


    const jwtToken = this.stateService.getCurrentJWT();
    this.userRoleId = jwtToken.roles?.pop()?.id;
    this.isManagerOrAdmin = this.userRoleId == '1' || this.userRoleId == '2' ? true : false;
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

}
