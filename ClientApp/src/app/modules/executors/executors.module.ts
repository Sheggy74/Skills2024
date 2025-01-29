import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutorsRoutingModule } from './executors-routing.module';
import { ListComponent } from './pages/executors/list/list.component';
import { ExecutorsComponent } from './pages/executors/executors.component';
import { TableModule } from 'primeng/table';
import { IconButtonComponent } from 'src/app/Shared/MESComponentsModule/icon-button/icon-button.component';
import { DialogModule } from 'primeng/dialog';
import { SelectExecutorComponent } from './pages/executors/select-executor/select-executor.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';



@NgModule({
  declarations: [
    ExecutorsComponent,
    ListComponent,
    SelectExecutorComponent
  ],
  imports: [
    CommonModule,
    ExecutorsRoutingModule,
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ]
})
export class ExecutorsModule { }
