import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {path:'' , component: ProjectComponent},
  // {path:'new' , component: AddEditExperimentComponent},
  // {path:'edit' , component: AddEditExperimentComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceRoutingModule { }
