import { Component, inject } from '@angular/core';
import { BlockService } from 'src/app/services/BlockService/block.service';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { AdminUserService } from '../../services/admin-user-service/admin-user.service';
import { UserUiService } from './user-ui-service/user-ui.service';
import { FileUploadEvent } from 'primeng/fileupload';

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
    userFile?: File;
    users: any[] = [];

    override async ngOnInit() {
      
    }

    uploadUsers(){
        if(this.userFile)
            this.adminUserService.uploadUsers(this.userFile);
    }

    public onUpload(event: any){
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.userFile = inputElement.files[0];
        this.uploadUsers();
      }
      
    }

    test(event: any){
      console.log(event);
      console.log(this.userFile);
      
    }

}
