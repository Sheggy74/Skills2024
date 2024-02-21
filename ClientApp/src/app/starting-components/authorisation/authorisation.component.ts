import { Component, inject } from '@angular/core';
import { timeout } from 'rxjs';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { JwtService } from 'src/app/services/JWTService/jwt.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-authorisation',
    templateUrl: './authorisation.component.html',
    styleUrls: ['./authorisation.component.css']
})
export class AuthorisationComponent extends BaseComponent {

    jwtService = inject(JwtService)
    stateService = inject(StateService)
    location = inject(Location)
    route = inject(ActivatedRoute)

    login : string = ''
    password : string = ''

    isLoading = false;
    constructor() {
        super();
    }
    override ngOnInit(): void {
        super.ngOnInit()

    }
    override ngOnDestroy() {
        super.ngOnDestroy();
    }
    async authoriseClick(event : any) {
        this.isLoading = true;

        let result = await this.jwtService.getToken(this.login,this.password, event)

        if(result.accessToken != null){
            this.stateService.setJWT(result)
            if(result.roles?.length == 1 && result.roles[0].startingUrl != null){
                this.router.navigateByUrl(result.roles[0].startingUrl)
            }else{
                this.router.navigateByUrl("role-selection")
            }
        }

        this.isLoading = false;
    }
    keyDown(event : KeyboardEvent){
        if(event.key == "Enter"){
            this.authoriseClick(event)
        }
    }
}
