import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridColumnsDirective } from './Directives/grid-columns.directive';
import { GridRowsDirective } from './Directives/grid-rows.directive';



@NgModule({
  declarations: [GridColumnsDirective, GridRowsDirective],
  imports: [
    CommonModule
  ],
  exports: [
    GridColumnsDirective,
    GridRowsDirective
  ]
})
export class MesDirectivesModule { }
