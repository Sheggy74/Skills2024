import { Component, inject, Input } from '@angular/core';
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
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.css'
})
export class TaskTableComponent {
   cols: Column[] = [];
    _selectedColumns: Column[] = [];
  
    @Input() tasks: Task[] = [];
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
    }
  
  
    get selectedColumns(): Column[] {
      return this._selectedColumns;
    }
  
    set selectedColumns(val: Column[]) {
      //restore original order
      this._selectedColumns = this.cols.filter((col) => val.includes(col));
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
