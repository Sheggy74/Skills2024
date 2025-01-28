import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() deleteTask = new EventEmitter<number>(); // Событие удаления задачи
  @Output() updateTask = new EventEmitter<Task>(); // Событие обновления задачи

  editSidebarVisible: boolean = false; // Видимость панели редактирования

  toggleCompletion() {
    this.task.completed = !this.task.completed;
  }

  onDelete() {
    this.deleteTask.emit(this.task.id); // Передаем ID задачи для удаления
  }

  openEditSidebar() {
    this.editSidebarVisible = true; // Открываем панель редактирования
  }

  onSaveChanges(updatedTask: Task) {
    this.updateTask.emit(updatedTask); // Передаем обновленную задачу
    this.editSidebarVisible = false; // Закрываем панель
  }
}
