import { Component, ComponentFactoryResolver, ElementRef, HostListener, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Calendar } from 'primeng/calendar';
import { Toast } from 'primeng/toast';
import { Subscription } from 'rxjs';
import { BaseComponent } from './system-components/base-component/base.component';
import { DynamicStyleService } from './services/DynamicStyleService/dynamic-style.service';
import { StateService } from './services/StateService/state.service';
import { MessageType, ToastService } from './services/ToastService/toast.service';
import { DefaultWrapperComponent } from './wrappers/default-wrapper/default-wrapper.component';
import { NavigationWrapperComponent } from './wrappers/navigation-wrapper/navigation-wrapper.component';
import { PrimeNGConfig } from 'primeng/api';
import { ConfigService } from './services/ConfigService/config.service';
import { OverlayPanel } from 'primeng/overlaypanel';
import { JwtService } from './services/JWTService/jwt.service';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { ErrorService } from './services/ErrorService/error.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseComponent {

    @ViewChild("appWrapper", { read: ViewContainerRef }) mainWrapperReference: ViewContainerRef | undefined;
    @ViewChild("mainDiv", { read: ElementRef<HTMLElement> }) mainDiv: ElementRef<HTMLElement> | undefined;
    @ViewChild("errorOverlay") errorOverlay : OverlayPanel | undefined

    primeNGConfig : PrimeNGConfig = inject(PrimeNGConfig)
    configService : ConfigService = inject(ConfigService)
    dynamicStyleService: DynamicStyleService = inject(DynamicStyleService)
    stateService: StateService = inject(StateService)
    jwtService : JwtService = inject(JwtService) // Запуск проверки валидности accessToken
    errorService = inject(ErrorService)
    isOpen = true;
    isToolbarAndMenuVisible = true;
    currentWrapperClass: string = '';
    i = 0;
    oldApplicationUrl: string = '';

    constructor(){
        super()
    }

    override async ngOnInit() {

    super.ngOnInit();

        setTimeout(()=>{
            if(this.errorOverlay == null){
                this.logger.error("errorOverlay is null")
                return
            }
            this.errorService.setOverlay(this.errorOverlay)
        })

        this.primeNGConfig.setTranslation(this.configService.ru)

        document.documentElement.style.setProperty('--test-color', 'blue');

        let subscription = this.router.events.subscribe((event) => {
            this.stateService.updateApplication(event)
        });
        this.subscriptions.push(subscription);

        let subscription2 = this.stateService.applicationName.subscribe((value) => {
            if(value.length < 1){
                document.title = "IDM-система"
                return 
            }
            document.title = "IDM-система. " + value.substring(0,1).toUpperCase() + value.substring(1, value.length)
        });
        this.subscriptions.push(subscription2);
        // если токен исчез, перейти на страницу авторизации
        this.subscriptions.push(this.stateService.jwtChanged.subscribe((jwt)=>{
            let currentJWT = this.stateService.getCurrentJWT()
            if(currentJWT.accessToken == null || currentJWT.accessEndDateTime == null){
                this.router.navigateByUrl("auth")
            }
        }))
    }
    
    override ngOnDestroy(): void {
        super.ngOnDestroy()

        this.jwtService.releaseTokenLockIfLocked()
    }
    @HostListener("document:keydown", ["$event"])
    handleDocumentKeyDown(event : KeyboardEvent){
        
    }

}
export interface NavigationEvent {
    url: string
}

