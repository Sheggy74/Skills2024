import { Component, inject } from '@angular/core';
import { DashboardService } from '../../../service/dashboard.service';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { MyProject } from 'src/app/Models/MyProject';

@Component({
  selector: 'app-my-projects',
  standalone: false,
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent extends BaseComponent {

  private dashboardService: DashboardService = inject(DashboardService)

  public projects: MyProject[] = []
  public projectsFiltered: MyProject[] = []
  public isFinished: boolean = false;

  override async ngOnInit(): Promise<void> {
    this.projects = await this.dashboardService.getMyProjects()
    this.projectsFiltered = this.projects.filter((project: MyProject) => project.percent && project.percent < 100)
  }

  public onCheckbox() {
    this.projectsFiltered = this.isFinished ?
      this.projects :
      this.projects.filter((project: MyProject) => project.percent && project.percent < 100)
  }
}
