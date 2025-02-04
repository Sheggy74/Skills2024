import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { PlanPageComponent } from './pages/plan/plan-page.component';

const routes: Routes = [
  {path:'' , component: PlanPageComponent},
  // {path:'new' , component: AddEditExperimentComponent},
  // {path:'edit' , component: AddEditExperimentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
