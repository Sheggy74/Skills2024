import { ChangeDetectorRef, Component, inject, Input, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { BehaviorSubject, debounce, interval, throttle } from 'rxjs';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { NavigationButton } from 'src/app/Models/NavigationButton';
import { AgileUIService } from 'src/app/services/AgileUIService/agileUI.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { NavigationStateService } from './NavigationStateService/navigation-state.service';

@Component({
	selector: 'app-navigation-menu',
	templateUrl: './navigation-menu.component.html',
	styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent extends BaseComponent {

    navigationStateService = inject(NavigationStateService)

	isOpen: boolean = true;
	navigationButtons: NavigationButton[] = [];
	nodes: TreeNode[] = [];
	selectedNode : TreeNode | undefined;

    changeRef = inject(ChangeDetectorRef)

    IS_TREE_HIDDEN = "[pff07][tree_hidden]"

    lastApplication = ""
    i = 0
	
	constructor(private agileUIService: AgileUIService, public stateService : StateService) {
		super();
	}
    override ngOnInit(): void {
        super.ngOnInit()

        this.isOpen = localStorage.getItem(this.IS_TREE_HIDDEN) === "true"
    }
	override async createSubscriptions() {
        super.createSubscriptions()

		this.subscriptions.push(this.stateService.applicationURL.subscribe(async (application) => {
            if(this.lastApplication != application){
                this.lastApplication = application  
                this.updateNavigationButtons(application)
            }
		}))
	}
	async updateNavigationButtons(application: string) {
		this.navigationButtons = await this.agileUIService.getButtonsForRole(application);
	}
	createNode(button: NavigationButton) : TreeNode{
		var node : TreeNode = {};
		node.children = []
		node.data = button
		if(button.caption != null){
			node.label = button.caption;
		}
		if(button.children != null){
			button.children.forEach(child => node.children?.push(this.createNode(child)))
		}
		return node
	}
	changeMenuState() {
		this.isOpen = !this.isOpen;

        localStorage.setItem(this.IS_TREE_HIDDEN, this.isOpen.toString())
	}
	nodeSelect(event : any){
		var routerLink = event.node.data.routerLink
		if(routerLink != null && routerLink != ''){
			this.router.navigateByUrl(routerLink)
		}
	}
	clickHideOpen(event : MouseEvent, node : TreeNode){
		event.stopPropagation();
		node.expanded = !node.expanded
	}
}
