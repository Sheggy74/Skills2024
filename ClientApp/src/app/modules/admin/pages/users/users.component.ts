import { Component, inject } from '@angular/core';
import { BlockService } from 'src/app/services/BlockService/block.service';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { AdminUserService } from '../../services/admin-user-service/admin-user.service';
import { UserUiService } from './user-ui-service/user-ui.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent {

    userUIService = inject(UserUiService)
    blockService = inject(BlockService)
    adminUserService = inject(AdminUserService)


    async deleteSelectedUser(){
        if(this.userUIService.selectedUser.value?.id == null){
            return
        }

        let blockResult = await this.blockService.blockObject(this.userUIService.selectedUser.value.id)
        if(blockResult != ""){
            return
        }
        let isDeleted = await this.adminUserService.deleteUser(this.userUIService.selectedUser.value.id)
        let unblockResult = await this.blockService.unblockObject(this.userUIService.selectedUser.value.id)
        if (isDeleted == false){
            return
        }

        let usersToChange = this.userUIService.users.value
        let index = usersToChange.findIndex((value)=>{
            return value.id == this.userUIService.selectedUser.value?.id
        })
        this.userUIService.selectedUser.next(undefined)
        if(index == -1){
            return
        }
        usersToChange.splice(index, 1)
        this.userUIService.users.next(usersToChange)
    }

}
