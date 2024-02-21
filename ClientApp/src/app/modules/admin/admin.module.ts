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



@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    MesComponentsModule,
    DividerModule,
    DialogModule,
    CheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    MesDirectivesModule
  ]
})
export class AdminModule { }
