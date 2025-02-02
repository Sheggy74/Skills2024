import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';
import { Priority } from 'src/app/Models/Priority';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Input() projectId = 0;
  @Output() createTask = new EventEmitter<Task>();
  @Output() visibleChange = new EventEmitter<boolean>();
  private workspaceService = inject(WorkspaceService);

  visible: boolean = false; 
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  prioritys: Priority[] = [];
  selectedPriority: number = 0; 

  ngOnInit() {
    this.workspaceService.updatePriority(this.projectId)
    this.workspaceService.priority.subscribe(prioritys => {
      this.prioritys = prioritys;
    })
  }

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
        taskStateId: 1,
        projectId: this.projectId,
        performers: [],
        performersId: [],
      };
      this.createTask.emit(newTask); 

      this.workspaceService.createTask(newTask)
      this.hideDialog(); 
      this.newTaskTitle = ''; 
      this.newTaskDescription = ''; 
    }
  }
}
