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


    override async ngOnInit(){
        super.ngOnInit()

        this.userUIService.users.next(await this.adminUserService.getUsers())
    }
}
