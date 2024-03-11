import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MesComponentsModule } from 'src/app/Shared/MESComponentsModule/mes-components.module';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MesDirectivesModule } from 'src/app/Shared/MESDirectives/mes-directives.module';
import { ExperimentsRoutingModule } from './experiments-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { ExperimentsComponent } from './pages/experiments/experiments.component';
import { ExperimentsListComponent } from './pages/experiments/experiments-list/experiments-list.component';
import { AddEditExperimentComponent } from './pages/experiments/add-edit-experiment/add-edit-experiment.component';



@NgModule({
  declarations: [
    ExperimentsComponent,
    ExperimentsListComponent,
    AddEditExperimentComponent
  ],
  imports: [
    CommonModule,
    ExperimentsRoutingModule,
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
export class ExperimentsModule { }
