import { Component, inject } from '@angular/core';
import { User } from 'src/app/Models/User';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { AdminUserService } from '../../../services/admin-user-service/admin-user.service';
import { UserUiService } from '../user-ui-service/user-ui.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent{

    adminUserService = inject(AdminUserService)
    userUIService = inject(UserUiService)

    selectedUser : User | undefined
    users: any[] = [];

    override async ngOnInit(){
        super.ngOnInit()
        this.users = await this.adminUserService.getUsersTree();
        console.log(this.users);
        
    }
}
