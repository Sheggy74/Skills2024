import { Component, inject, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { StateService } from 'src/app/services/StateService/state.service';
import { ImageComponent } from 'src/app/Shared/MESComponentsModule/image/image.component';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent extends BaseComponent {

    @ViewChild("overlayPanel") overlayPanel: OverlayPanel | undefined;
    @ViewChild("departmentSelectionOverlay") departmentSelectionOverlay: OverlayPanel | undefined;
    @ViewChild("departmentImage") departmentImage: ImageComponent | undefined

    stateService = inject(StateService)

    isInfoOverlayOpen: boolean = false;

    SELECTED_DEPARTMENT = "[PFF07][SelectedDepartment]"

    constructor() {
        super();

    }
    override async ngOnInit() {
        super.ngOnInit()
    }
    getLogoID(department: any) {
        return this.extractPath(department?.jValue, ["attributes", "Логотип"])
    }
    override createSubscriptions(): void {
       
        setTimeout(() => {
            var subscription1 = this.overlayPanel?.onHide.subscribe(() => this.isInfoOverlayOpen = false)
            var subscription2 = this.overlayPanel?.onShow.subscribe(() => this.isInfoOverlayOpen = true)

            let i = 0;
            subscription1 != null ? this.subscriptions.push(subscription1) : i++;
            subscription2 != null ? this.subscriptions.push(subscription2) : i++;
        }, 0);
    }
    getFIO() {
        /* return UserHelper.getShortFullName(this.currentUser) */
    }
    toggleOverlay(event: any) {
        this.overlayPanel?.toggle(this.overlayPanel);
    }
    logout() {
        this.stateService.setJWT({})
        this.router.navigateByUrl('auth')
    }
    
   
    override ngOnDestroy(): void {
        super.ngOnDestroy()
    }
}
