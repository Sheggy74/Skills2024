import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { Priority } from 'src/app/Models/Priority';
import { State } from 'src/app/Models/State';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  task?: Task;
  editedTitle?: string;
  selectStateId?: number;
  selectPriorityId?: number;
  selectDeadline?: Date;
  private workspaceService = inject(WorkspaceService);

  prioritys: Priority[] = [];
  states: State[] = [];


  ngOnInit() {
    this.workspaceService.selectedTask.subscribe(task => {
      this.task = task;
      this.editedTitle = this.task?.name;
      this.selectPriorityId = this.task?.priorityId;
      this.selectStateId = this.task?.stateId;
      if (this.task?.deadline)
        this.selectDeadline = new Date(this.task?.deadline);
      if (this.task != undefined) {
        this.workspaceService.updatePriority();
        this.workspaceService.updateState(this.task.projectId);
        this.workspaceService.priority.subscribe(prioritys => {
          this.prioritys = prioritys;
        })
        this.workspaceService.state.subscribe(states => {
          this.states = states;
        })
      }
    })
    
    
  }

  onSave() {
    if (this.task){
      this.task.deadline = this.selectDeadline?.toISOString();
      this.task.priorityId = this.selectPriorityId;
      this.task.stateId = this.selectStateId;
      this.task.name = this.editedTitle ?? '';
      this.workspaceService.editTask(this.task.id, this.task);
      this.workspaceService.closeSidebarVisible();
      this.workspaceService.updateData(this.task.projectId)
    }
    
  }
}
