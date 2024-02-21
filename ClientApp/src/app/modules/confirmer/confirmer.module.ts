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
import { ConfirmerRoutingModule } from './confirmer-routing.module';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ApplicationsComponent } from './pages/applications/applications.component';





@NgModule({
  declarations: [
ApplicationsComponent,
AnalyticsComponent
  ],
  imports: [
    CommonModule,
    ConfirmerRoutingModule,
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
export class ConfirmerModule { }
