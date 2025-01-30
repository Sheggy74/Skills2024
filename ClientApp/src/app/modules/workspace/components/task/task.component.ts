import { Component, Input, Output, EventEmitter, inject, input } from '@angular/core';
import { Priority } from 'src/app/Models/Priority';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';

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
  prioritys: Priority[] = [];
  priority: Priority | undefined;

  editSidebarVisible: boolean = false; 

  ngOnInit() {
    this.workspaceService.updatePriority(this.projectId)
    this.workspaceService.priority.subscribe(priority => {
      this.prioritys = priority;
      console.log(this.prioritys);
    })
    // this.priority = this.prioritys.filter(el => {
    //   return el.id = this.task.priorityId; 
    // }) || ""
    // console.log(this.priorityName);
  }

  toggleCompletion() {
    // this.task.completed = !this.task.completed;
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
