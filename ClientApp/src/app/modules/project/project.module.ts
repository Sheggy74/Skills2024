import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './pages/project.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ChipsModule } from 'primeng/chips';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { StepsModule } from 'primeng/steps';
import { MultiSelectModule } from 'primeng/multiselect';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table'; 
import { TagModule } from 'primeng/tag';
import { AddTagsComponent } from './pages/add-tags/add-tags.component';
import { CntxMenuModule } from 'src/app/InterfaceComponents/ContextMenu/cntx.module';
import { ScrollPanelModule } from 'primeng/scrollpanel';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectListComponent,
    AddProjectComponent,
    AddTagsComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    DataViewModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    CardModule,
    SidebarModule,
    DividerModule,
    SplitButtonModule,
    OverlayPanelModule,
    ChipsModule,
    InputTextModule,
    MenuModule,
    DialogModule,
    StepsModule,
    MultiSelectModule,
    ColorPickerModule,
    InputTextareaModule,
    TableModule,
    TagModule,
    CntxMenuModule,
    ScrollPanelModule
    
  ],
})
export class ProjectModule { }
