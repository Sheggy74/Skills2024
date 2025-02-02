import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './pages/project.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { WorkspaceComponent } from '../workspace/pages/workspace/workspace.component';

const routes: Routes = [
  {path:"",component:ProjectComponent},
  {path:'add',component:AddProjectComponent},
  {path:'edit',component:AddProjectComponent},
  {
    path: `workspac/:id`,
    loadChildren: () => import('../workspace/workspace.module').then(m => m.WorkspaceModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
