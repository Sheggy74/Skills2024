import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  @Input() visible: boolean = false; // Видимость панели
  @Input() task!: Task; // Задача для редактирования
  @Output() visibleChange = new EventEmitter<boolean>(); // Событие изменения видимости
  @Output() saveChanges = new EventEmitter<Task>(); // Событие сохранения изменений

  editedTitle: string = ''; // Редактируемое название задачи
  editedDescription: string = ''; // Редактируемое описание задачи

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
    this.saveChanges.emit(updatedTask); // Передаем обновленную задачу
    this.closeSidebar();
  }

  closeSidebar() {
    this.visible = false;
    this.visibleChange.emit(this.visible); // Закрываем панель
  }
}
