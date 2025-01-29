import { Component, inject, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-project',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  private workspaceService = inject(WorkspaceService);

  async ngOnInit(): Promise<void> {
    const savedTasks = await this.workspaceService.getTasksForProject(7);
    if (savedTasks) {
      this.tasks = savedTasks;
    }
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
  }
}
