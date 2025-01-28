import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExecutorsComponent } from './pages/executors/executors.component';

const routes: Routes = [
  { path: '', component: ExecutorsComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutorsRoutingModule { }
