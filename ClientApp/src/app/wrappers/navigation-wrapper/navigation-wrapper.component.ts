import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { interval, timeout, timer } from 'rxjs';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { AgileUIService } from 'src/app/services/AgileUIService/agileUI.service';
import { StateService } from 'src/app/services/StateService/state.service';

@Component({
	selector: 'app-navigation-wrapper',
	templateUrl: './navigation-wrapper.component.html',
	styleUrls: ['./navigation-wrapper.component.css']
})
export class NavigationWrapperComponent extends BaseComponent {
    stateService = inject(StateService)

	title = 'projectNew';
	isOpen = true;
	isOpenDelayedOnClose = true;
	isToolbarAndMenuVisible = true;
	currentWrapperClass: string = '';
	/* navigationButtons : NavigationButton[] = []; */
	isNavigationVisible = false;
	lastURL : string = '';
	constructor() {
		super();
		
	}
	
	override async ngOnInit(){
		super.ngOnInit();
	}
	

}
