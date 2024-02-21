import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewApplicationComponent } from '../user/pages/Applications/new-application/new-application.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { ApplicationsComponent } from './pages/applications/applications.component';


const routes: Routes = [
  {path:'applications' , component:ApplicationsComponent},
  {path:'analytics' , component:AnalyticsComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmerRoutingModule { }
