import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { JwtService } from 'src/app/services/JWTService/jwt.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { Role } from 'src/app/Models/Role';
import { Projects } from 'src/app/Models/Projects';
import { Priority } from 'src/app/Models/Priority';

@Component({
  selector: 'app-project',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  tasks: Task[] = [];
  prioritys: Priority[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  projectId: number = 0;
  projectName: string = "";
  userRoleId: string | undefined;
  isManagerOrAdmin: boolean = false;
  isLoadingProject: boolean = false;
  isLoadingTask: boolean = false;
  isLoadingPriority: boolean = false;

  private workspaceService = inject(WorkspaceService);
  private jwtService = inject(JwtService);
  private stateService = inject(StateService)
  constructor(private route: ActivatedRoute) { }

  editSidebarVisible: boolean = false;

  async ngOnInit(): Promise<void> {
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
    this.workspaceService.project.subscribe(project=> {
      this.projectName = project?.name || '';
    })


    this.workspaceService.updateData(this.projectId)
    this.workspaceService.tasks.subscribe(tasks => {
      this.tasks = tasks;
    })

    this.workspaceService.updatePriority(this.projectId)
    this.workspaceService.priority.subscribe(priority => {
      this.prioritys = priority;
    })

    const jwtToken = this.stateService.getCurrentJWT();
    this.userRoleId = jwtToken.roles?.pop()?.id;
    this.isManagerOrAdmin = this.userRoleId == '1' || this.userRoleId == '2' ? true : false;
  }

  async addTask(newTask: Task) {
    this.workspaceService.createTask(newTask)
    // this.tasks.push(newTask);
    await this.workspaceService.updateData(7);
    this.tasks = this.workspaceService.tasks.value;
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
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

  openEditSidebar() {
    this.editSidebarVisible = true;
  }
}
