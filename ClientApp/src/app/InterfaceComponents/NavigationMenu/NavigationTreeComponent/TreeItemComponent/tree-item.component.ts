import { createInjectableType } from '@angular/compiler';
import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { NavigationButton } from 'src/app/Models/NavigationButton';
import { NavigationStateService } from '../../NavigationStateService/navigation-state.service';
import { StateService } from 'src/app/services/StateService/state.service';
import { ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.css']
})
export class TreeItemComponent extends BaseComponent{

    stateService = inject(StateService)
    activatedRoute = inject(ActivatedRoute)

    routerLink : string | undefined

    @Input() navigationButton : NavigationButton = {}
    @Input() paddingLeft : number = 0
    @Input() level : number = 0


    navigationStateService : NavigationStateService = inject(NavigationStateService)
    override ngOnInit(){
        super.ngOnInit();

        let hasNoChildren = this.navigationButton.children == null || this.navigationButton.children.length > 0
        let notEmptyLink = this.navigationButton.routerLink != null && this.navigationButton.routerLink.length > 1
        if(notEmptyLink && hasNoChildren){
            this.routerLink = this.navigationButton.routerLink
        }

        // select for initial load
        this.selectByUrl(this.router.url)
    }
    override createSubscriptions(){
        super.createSubscriptions()
        this.subscriptions.push(
            this.navigationStateService.selectedButton.subscribe((button)=>{
                if(button.caption != this.navigationButton.caption || button.routerLink != this.navigationButton.routerLink || button.iconClass != this.navigationButton.iconClass){
                    this.navigationButton.selected = false
                } else{
                    this.navigationButton.selected = true
                }
            })
        )
        // select if url changed from outside
        this.subscriptions.push(
            this.router.events.subscribe((event)=>{
                if (event instanceof NavigationEnd == false) {
                    return
                }
                let navEvent = event as NavigationEnd
                let eventURL = navEvent.url
                this.selectByUrl(eventURL)
            })
        )
    }
    selectByUrl(url : string){
        // trim /subjects to subjects 
        let eventURLTrimmed = url.substring(1,url.length) 
        if(url == this.navigationButton.routerLink ||  eventURLTrimmed == this.navigationButton.routerLink){
            this.navigationStateService.selectedButton.next(this.navigationButton)
        }
    }
    expandClick(){
        this.navigationButton.expanded = !this.navigationButton.expanded
    }
    navButtonClick(){
        if(this.navigationButton.children != null && this.navigationButton.children.length != 0){
            this.navigationButton.expanded = !this.navigationButton.expanded 
            return
        }

        this.navigationButton.selected = true;
        this.navigationStateService.selectedButton.next(this.navigationButton)
        if(this.navigationButton.routerLink == null || this.navigationButton.routerLink == ''){
            return
        }
        this.router.navigateByUrl(this.navigationButton.routerLink)
    }
}
