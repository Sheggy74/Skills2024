import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentsComponent } from './pages/experiments/experiments.component';
import { AddEditExperimentComponent } from './pages/experiments/add-edit-experiment/add-edit-experiment.component';

const routes: Routes = [
  {path:'' , component: ExperimentsComponent},
  {path:'new' , component: AddEditExperimentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule { }
