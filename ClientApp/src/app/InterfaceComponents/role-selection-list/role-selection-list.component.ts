import { Component, inject } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { AgileUIService } from 'src/app/services/AgileUIService/agileUI.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { JwtService } from 'src/app/services/JWTService/jwt.service';
import { Role } from 'src/app/Models/Role';

@Component({
    selector: 'app-role-selection-list',
    templateUrl: './role-selection-list.component.html',
    styleUrls: ['./role-selection-list.component.css']
})
export class RoleSelectionListComponent extends BaseComponent {

    agileUIService = inject(AgileUIService)
    jwtService = inject(JwtService)
    stateService = inject(StateService)
    roles : Role[] = []

    override async ngOnInit() {
        super.ngOnInit()
    }
    override createSubscriptions(){
        super.createSubscriptions()

        this.subscriptions.push(this.stateService.jwtChanged.subscribe((jwt)=>{
            if (jwt == null || jwt.roles == null){
                this.roles = []
                return
            }
            this.roles = jwt.roles
        }))
    }
    reloadApplication(){
        // Убиваем текущий accessToken
        this.stateService.setJWT({})
        this.jwtService.refreshTokenIfCloseToEnd()
    }
}
