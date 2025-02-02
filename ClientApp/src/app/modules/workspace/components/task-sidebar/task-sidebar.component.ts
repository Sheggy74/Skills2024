import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrl: './task-sidebar.component.css'
})
export class TaskSidebarComponent {
  @Input() visible: boolean = false;  // Получаем значение из родительского компонента
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();  // Для двусторонней привязки

  sidebarWidth: number = 500;  // Начальная ширина сайдбара
  isResizing: boolean = false;
  lastX: number = 0;

  tabs = [
    { label: 'Чат', content: 'Content of Tab 1' },
    { label: 'Редактирование', content: 'Content of Tab 2' },
    { label: 'Исполнители', content: 'Content of Tab 3' }
  ];

  toggleSidebar() {
    this.visible = !this.visible; 
    this.visibleChange.emit(this.visible); 
  }
}
