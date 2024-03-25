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
import { ScriptsRoutingModule } from './scripts-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { ScriptListComponent } from './pages/scripts/script-list/script-list.component';
import { AddScriptComponent } from './pages/scripts/add-script/add-script.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    ScriptsComponent,
    ScriptListComponent,
    AddScriptComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    DropdownModule,
    AutoCompleteModule,
    ScriptsRoutingModule,
    CalendarModule,
    TableModule,
    InputTextareaModule,
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
export class ScriptsModule { }
