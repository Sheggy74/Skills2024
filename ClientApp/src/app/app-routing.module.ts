import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleSelectionListComponent } from './InterfaceComponents/role-selection-list/role-selection-list.component';
import { AuthorisationComponent } from './starting-components/authorisation/authorisation.component';
import { NavigationWrapperComponent } from './wrappers/navigation-wrapper/navigation-wrapper.component';


const routes: Routes = [

  { path: 'auth', component: AuthorisationComponent },
  {
    path: '', component: NavigationWrapperComponent,
    children: [
      { path: "role-selection", component: RoleSelectionListComponent },
      { path: 'admin', loadChildren: () => { return import('./modules/admin/admin.module').then(m => m.AdminModule); } },
      { path: 'user', loadChildren: () => { return import('./modules/user/user.module').then(m => m.UserModule); } },
      { path: 'workspace', loadChildren: () => { return import('./modules/workspace/workspace.module').then(m => m.WorkspaceModule); } },
      { path: "**", component: RoleSelectionListComponent },
    ]
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
