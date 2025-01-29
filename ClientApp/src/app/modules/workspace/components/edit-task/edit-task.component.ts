import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input() visible: boolean = false;
  @Input() task!: Task;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveChanges = new EventEmitter<Task>();
  editedTitle: string = '';
  editedDescription: string = '';
  private workspaceService = inject(WorkspaceService);
  

  ngOnChanges() {
    if (this.task) {
      this.editedTitle = this.task.name;
      this.editedDescription = this.task.description;
    }
  }

  onSave() {
    const updatedTask: Task = {
      ...this.task,
      name: this.editedTitle,
      description: this.editedDescription
    };
    this.saveChanges.emit(updatedTask);
    this.closeSidebar();
  }

  closeSidebar() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
