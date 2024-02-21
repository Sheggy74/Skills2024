import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { MesComponentsModule } from 'src/app/Shared/MESComponentsModule/mes-components.module';
import { DividerModule } from 'primeng/divider';

import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MesDirectivesModule } from 'src/app/Shared/MESDirectives/mes-directives.module';
import { NewApplicationComponent } from './pages/Applications/new-application/new-application.component';
import { UserRoutingModule } from './user-routing.module';
import { MyrolesComponent } from './pages/Applications/myroles/myroles.component';
import { MyapplicationsComponent } from './pages/Applications/myapplications/myapplications.component';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
NewApplicationComponent,
MyrolesComponent,
MyapplicationsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatTabsModule
  ]
})
export class UserModule { }
