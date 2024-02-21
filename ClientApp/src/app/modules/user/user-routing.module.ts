import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyapplicationsComponent } from './pages/Applications/myapplications/myapplications.component';
import { MyrolesComponent } from './pages/Applications/myroles/myroles.component';
import { NewApplicationComponent } from './pages/Applications/new-application/new-application.component';

const routes: Routes = [
  {path:'newapplication' , component:NewApplicationComponent},
  {path:'myroles' , component:MyrolesComponent},
  {path:'myapplications' , component:MyapplicationsComponent},
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
