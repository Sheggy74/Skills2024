import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Projects } from 'src/app/Models/Projects';
import { Task } from 'src/app/Models/Task';
import { ExecutorsService } from '../../../services/executors-service.service';

@Component({
  selector: 'app-select-executor',
  templateUrl: './select-executor.component.html',
  standalone: false,
  styleUrl: './select-executor.component.css'
})
export class SelectExecutorComponent {

  tasks: Task[] = [];
  projects: Projects[] = [];

  executorsService: ExecutorsService = inject(ExecutorsService)

  title: string = "Назначить исполнителя"

  isOpen: boolean = false

  formGroup: FormGroup = new FormGroup({
    "project": new FormControl(null),
    "task": new FormControl(null)
  })

  searchTasks($event: any) {
    const query = $event.query;
    // Логика получения списка задач
    this.getTasks(this.formGroup.controls['project'].value).then((tasks: Task[]) => {
      this.tasks = tasks.filter((task: Task) => task.name.toLowerCase().includes(query.toLowerCase()));
    })
  }

  searchProjects($event: any) {
    const query = $event.query;
    // Логика получения списка проектов
    this.getProjects().then((projects: Projects[]) => {
      this.projects = projects.filter((projec: Projects) => projec.name ? projec.name.toLowerCase().includes(query.toLowerCase()) : '');
    })
  }


  onSubmit() {

  }

  public show() {
    this.isOpen = true;
  }

  private async getProjects(): Promise<Projects[]> {
    return await this.executorsService.getProjects();
  }

  private async getTasks(project: Projects): Promise<Task[]> {
    return await this.executorsService.getTasks(project);
  }
}
