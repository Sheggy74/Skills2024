import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [
  {path:'' , component: WorkspaceComponent},
  // {path:'new' , component: AddEditExperimentComponent},
  // {path:'edit' , component: AddEditExperimentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
