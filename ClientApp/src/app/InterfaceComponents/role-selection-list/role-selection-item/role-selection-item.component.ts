import { Component, Input } from '@angular/core';
import { Role } from 'src/app/Models/Role';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-role-selection-item',
  templateUrl: './role-selection-item.component.html',
  styleUrls: ['./role-selection-item.component.css']
})
export class RoleSelectionItemComponent extends BaseComponent {
    
    @Input() role : Role  = {}

    override ngOnInit(): void {
        super.ngOnInit()

    }
    tryNavigate(){
        if(this.role.startingUrl == null){
            return
        }
        this.router.navigateByUrl(this.role.startingUrl)
    }
}
