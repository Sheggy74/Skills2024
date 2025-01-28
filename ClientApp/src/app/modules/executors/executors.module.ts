import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExecutorsRoutingModule } from './executors-routing.module';
import { ListComponent } from './pages/executors/list/list.component';
import { ExecutorsComponent } from './pages/executors/executors.component';



@NgModule({
  declarations: [
    ExecutorsComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ExecutorsRoutingModule
  ]
})
export class ExecutorsModule { }
