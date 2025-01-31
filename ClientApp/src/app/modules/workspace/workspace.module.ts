import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { TaskComponent } from './components/task/task.component';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { SelectExecutorComponent } from './components/select-executor/select-executor.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { DropdownModule } from 'primeng/dropdown';
import {ToolbarModule} from 'primeng/toolbar';
import {CheckboxModule} from 'primeng/checkbox';
import {ScrollerModule} from 'primeng/scroller';
import { TableModule } from 'primeng/table';
import {AvatarModule} from 'primeng/avatar';




@NgModule({
  declarations: [TaskComponent, WorkspaceComponent, EditTaskComponent, CreateTaskComponent, SelectExecutorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    WorkspaceRoutingModule,
    AccordionModule,
    DividerModule,
    ButtonModule,
    SidebarModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    TooltipModule,
    SkeletonModule,
    DropdownModule,
    ToolbarModule,
    CheckboxModule,
    ScrollerModule,
    TableModule,
    AvatarModule
  ]
})
export class WorkspaceModule { }
