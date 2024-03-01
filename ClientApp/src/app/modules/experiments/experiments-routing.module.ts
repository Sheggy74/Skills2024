import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentsListComponent } from './pages/experiments-list/experiments-list.component';

const routes: Routes = [
  {path:'' , component: ExperimentsListComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule { }
