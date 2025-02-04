import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { TableModule } from 'primeng/table';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { MesComponentsModule } from 'src/app/Shared/MESComponentsModule/mes-components.module';
import { DividerModule } from 'primeng/divider';
import { AddEditUserComponent } from './pages/users/add-edit-user/add-edit-user.component';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MesDirectivesModule } from 'src/app/Shared/MESDirectives/mes-directives.module';
import { RoleSelectorComponent } from "./pages/users/add-edit-user/role-selector/role-selector.component";
import { SetOnProjComponent } from './pages/users/set-on-proj/set-on-proj.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { TreeTableModule } from 'primeng/treetable';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    AddEditUserComponent,
    RoleSelectorComponent,
    SetOnProjComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AutoCompleteModule,
    TableModule,
    MesComponentsModule,
    DividerModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MesDirectivesModule,
    FileUploadModule,
    TreeTableModule,
    SkeletonModule
  ]
})
export class AdminModule { }
