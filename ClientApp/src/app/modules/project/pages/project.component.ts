import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { ProjectService } from '../services/project.service';
import { Projects } from 'src/app/Models/Projects';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit{
  private router = inject(Router);
  private projectService= inject(ProjectService);
  public projects?:Projects=undefined;
  sidebarVisible: boolean = false;
  ngOnInit(): void {
    
  }
  
}
