import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Projects } from 'src/app/Models/Projects';

@Component({
  selector: 'app-select-executor',
  templateUrl: './select-executor.component.html',
  standalone: false,
  styleUrl: './select-executor.component.css'
})
export class SelectExecutorComponent {
  searchTasks($event: any) {
    const query = $event.query;
    // Логика получения списка задач
    this.tasks = [
      { name: 'Проект 1' },
      { name: 'Проект 2' },
      { name: 'Проект 3' }
    ].filter(task => task.name.toLowerCase().includes(query.toLowerCase()));
    throw new Error('Method not implemented.');
  }
  tasks: any;
  searchProjects($event: any) {
    const query = $event.query;
    console.log($event);

    // Логика получения списка проектов
    this.projects = [
      { name: 'Проект 1' },
      { name: 'Проект 2' },
      { name: 'Проект 3' }
    ].filter(project => project.name.toLowerCase().includes(query.toLowerCase()));
    throw new Error('Method not implemented.');
  }

  title: string = "Назначить исполнителя"

  isOpen: boolean = false

  formGroup: FormGroup = new FormGroup({
    "project": new FormControl(null),
    "task": new FormControl(null)
  })
  projects: any;

  onSubmit() {

  }

  public show() {
    this.isOpen = true;

  }
}
