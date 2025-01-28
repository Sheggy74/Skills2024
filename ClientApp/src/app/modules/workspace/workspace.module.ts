import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { TaskComponent } from './components/task/task.component';
import { ProjectComponent } from './pages/project/project.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [TaskComponent,ProjectComponent, EditTaskComponent, CreateTaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    WorkspaceRoutingModule,
    AccordionModule,
    DividerModule,
    ButtonModule,
    SidebarModule,
    DialogModule
  ]
})
export class WorkspaceModule { }
