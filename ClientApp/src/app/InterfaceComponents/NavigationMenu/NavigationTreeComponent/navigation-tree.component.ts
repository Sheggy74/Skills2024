import { Component, inject, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { NavigationButton } from 'src/app/Models/NavigationButton';
import { NavigationStateService } from '../NavigationStateService/navigation-state.service';

@Component({
  selector: 'app-navigation-tree',
  templateUrl: './navigation-tree.component.html',
  styleUrls: ['./navigation-tree.component.css']
})
export class NavigationTreeComponent extends BaseComponent {

    navigationStateService = inject(NavigationStateService)

    @Input() navigationButton : NavigationButton = {}
    @Input() navigationButtons : NavigationButton[] = []
    @Input() paddingLeft : number = 0
    @Input() level : number = 0
    
    constructor(){
        super()
        
        this.navigationStateService.selectedButton.next({})
    }

    override ngOnInit(){
        super.ngOnInit()
    }

    override createSubscriptions(){
        super.createSubscriptions()

        this.subscriptions.push(this.navigationStateService.selectedButton.subscribe((button)=>{
            if(this.navigationButton.children == null){
                return
            }
            for (let i = 0; i < this.navigationButtons.length; i++){
                if(button.routerLink == this.navigationButtons[i].routerLink && button.routerLink != null && button.routerLink != ""){
                    this.navigationButton.expanded = true
                    return
                }
            }
        }))
    }
}
