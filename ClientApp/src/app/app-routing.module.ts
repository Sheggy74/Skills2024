import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorisationComponent } from './starting-components/authorisation/authorisation.component';
import { JwtService } from './services/JWTService/jwt.service';
import { StateService } from './services/StateService/state.service';
import { DefaultWrapperComponent } from './wrappers/default-wrapper/default-wrapper.component';
import { NavigationWrapperComponent } from './wrappers/navigation-wrapper/navigation-wrapper.component';
import { RoleSelectionListComponent } from './InterfaceComponents/role-selection-list/role-selection-list.component';


const routes: Routes = [
    { path: 'auth', component: AuthorisationComponent },
    {
        path: '', component: NavigationWrapperComponent,
        children: [
            { path: "role-selection", component: RoleSelectionListComponent},
            { path: 'admin', loadChildren: () => { return import('./modules/admin/admin.module').then(m => m.AdminModule); }},
            { path: 'user', loadChildren: () => { return import('./modules/user/user.module').then(m => m.UserModule); }},
            { path: 'confirmer', loadChildren: () => { return import('./modules/confirmer/confirmer.module').then(m => m.ConfirmerModule); }}
        ]

    },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
