import { Component, inject, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  private workspaceService = inject(WorkspaceService);

  ngOnInit(): void {
    // Загрузка задач из localStorage или API
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }

    console.log(this.workspaceService.getTasksForProject(7))
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.saveTasks();
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id; // Уникальный идентификатор задачи
  }

  removeTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  changeTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      // Создаем новый массив с обновленной задачей
      this.tasks = [
        ...this.tasks.slice(0, index), // Все задачи до обновленной
        updatedTask, // Обновленная задача
        ...this.tasks.slice(index + 1) // Все задачи после обновленной
      ];
      this.saveTasks();
    }
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
