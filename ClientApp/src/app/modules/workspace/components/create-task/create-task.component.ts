import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output() createTask = new EventEmitter<Task>();
  @Output() visibleChange = new EventEmitter<boolean>();
    private workspaceService = inject(WorkspaceService);

  visible: boolean = false; 
  newTaskTitle: string = '';
  newTaskDescription: string = '';

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSubmit() {
    if (this.newTaskTitle.trim() !== '' && this.newTaskDescription.trim() !== '') {
      const newTask: Task = {
        id: 0,
        name: this.newTaskTitle,
        description: this.newTaskDescription,
        dateCreation: new Date(),
        
      };
      this.createTask.emit(newTask); 
      this.hideDialog(); 
      this.newTaskTitle = ''; 
      this.newTaskDescription = ''; 
    }
  }
}
