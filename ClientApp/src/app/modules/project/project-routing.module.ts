import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './pages/project.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';

const routes: Routes = [
  {path:"",component:ProjectComponent},
  {path:'add',component:AddProjectComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
