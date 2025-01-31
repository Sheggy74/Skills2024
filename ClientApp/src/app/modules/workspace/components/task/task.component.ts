import { Component, Input, Output, EventEmitter, inject, input } from '@angular/core';
import { Priority } from 'src/app/Models/Priority';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { ProjectUserService } from '../../services/project-user.service';
import { User } from 'src/app/Models/User';

interface color {
  color: string,
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
  @Input() projectId!: number;
  @Input() isManagerOrAdmin!: boolean;
  @Output() deleteTask = new EventEmitter<number>();
  @Output() updateTask = new EventEmitter<Task>();
  private workspaceService = inject(WorkspaceService);
  private projectUserService = inject(ProjectUserService);
  prioritys: Priority[] = [];
  priorityName?: string = "";
  priorityColor: color = { color: 'green' }
  executor?: User;

  editSidebarVisible: boolean = false;
  selectExecutorVisible: boolean = false;
  isHaveExecutor: boolean = false;

  ngOnInit() {
    this.workspaceService.priority.subscribe(priority => {
      this.prioritys = priority;
      if (this.prioritys.length > 0) {
        this.priorityName = this.prioritys.filter(el => {
          return el.id == this.task.priorityId;
        })[0].name
      }
    })
    switch (this.task.priorityId) {
      case 1: {
        this.priorityColor = { color: 'green' }
        break;
      }
      case 2: {
        this.priorityColor = { color: 'orange' };
        break;
      }
      case 3: {
        this.priorityColor = { color: 'red' }
        break;
      }
    }
    this.isHaveExecutor = this.task.userId ? true : false;
    // if (this.task.userId) {
    //   this.projectUserService.getExecutorTask(this.task.userId).then(res => {
    //     this.executor = res;
    //     console.log(this.executor);
    //   });
    // }

  }

  onDelete() {
    this.deleteTask.emit(this.task.id);
  }

  openEditSidebar() {
    this.editSidebarVisible = true;
  }

  onSaveChanges(updatedTask: Task) {
    this.updateTask.emit(updatedTask);
    this.editSidebarVisible = false;
  }
}
