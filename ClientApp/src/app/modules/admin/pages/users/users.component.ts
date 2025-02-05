import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BlockService } from 'src/app/services/BlockService/block.service';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { AdminUserService } from '../../services/admin-user-service/admin-user.service';
import { UserUiService } from './user-ui-service/user-ui.service';
import { FileUploadEvent } from 'primeng/fileupload';
import { UserListComponent } from './user-list/user-list.component';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent {

    userUIService = inject(UserUiService)
    blockService = inject(BlockService)
    adminUserService = inject(AdminUserService)
    userFile?: File=undefined;
    users: any[] = [];
    @ViewChild(
      'user_list'
    ) list!: UserListComponent;

    override async ngOnInit() {
      
    }

    async uploadUsers(){
        if(this.userFile)
        {
         await this.adminUserService.uploadUsers(this.userFile);
          this.list.getUsers()
        }
    }

    public onUpload(event: any){
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.userFile = inputElement.files[0];
        this.uploadUsers();
      }
      
    }

}
