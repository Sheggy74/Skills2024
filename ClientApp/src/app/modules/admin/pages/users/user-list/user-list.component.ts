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

    override ngOnInit(){
        super.ngOnInit();
        this.getUsers();     
    }

    public onCheck(data: any){      
        this.adminUserService.setAdd(data.id,data.can_add)        
    }

    public async getUsers(){
      this.users = await this.adminUserService.getUsersTree();  
    }
}
