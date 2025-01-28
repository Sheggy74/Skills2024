import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Output() createTask = new EventEmitter<Task>(); // Событие создания задачи
  @Output() visibleChange = new EventEmitter<boolean>(); // Событие изменения видимости

  visible: boolean = false; // Видимость диалогового окна
  newTaskTitle: string = ''; // Название новой задачи
  newTaskDescription: string = ''; // Описание новой задачи

  showDialog() {
    this.visible = true; // Открываем диалоговое окно
  }

  hideDialog() {
    this.visible = false; // Закрываем диалоговое окно
    this.visibleChange.emit(this.visible); // Уведомляем родительский компонент
  }

  onSubmit() {
    if (this.newTaskTitle.trim() !== '' && this.newTaskDescription.trim() !== '') {
      const newTask: Task = {
        id: Date.now(),
        name: this.newTaskTitle,
        description: this.newTaskDescription,
        dateCreation: new Date(),
        
      };
      this.createTask.emit(newTask); // Передаем новую задачу
      this.hideDialog(); // Закрываем диалоговое окно
      this.newTaskTitle = ''; // Очищаем поле названия
      this.newTaskDescription = ''; // Очищаем поле описания
    }
  }
}
