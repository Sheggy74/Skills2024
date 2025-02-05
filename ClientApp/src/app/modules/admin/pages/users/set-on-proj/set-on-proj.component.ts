import { Component, inject } from '@angular/core';
import { UserUiService } from '../user-ui-service/user-ui.service';
import { User } from 'src/app/Models/User';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { Projects } from 'src/app/Models/Projects';
import { AdminUserService } from '../../../services/admin-user-service/admin-user.service';
import { NotificationsService } from 'src/app/services/NotificationsService/notifications.service';
import { MessageType, ToastService } from 'src/app/services/ToastService/toast.service';

@Component({
  selector: 'app-set-on-proj',
  standalone: false,
  templateUrl: './set-on-proj.component.html',
  styleUrl: './set-on-proj.component.css'
})
export class SetOnProjComponent extends BaseComponent {


  private userUiService: UserUiService = inject(UserUiService)
  private adminService: AdminUserService = inject(AdminUserService)
  private toastService: ToastService = inject(ToastService)

  public title: string = ''
  public isOpen: boolean = false;
  private projects: Projects[] = []
  public projectsFiltered: Projects[] = [];
  public searchString: string = ''
  public selectedProject?: Projects
  public selectedUser?: User

  constructor() {
    super()
    this.userUiService.selectedUser.subscribe((user: User | undefined) => {
      let userfio=user?user.fio:'';
      this.title = 'Назначить пользователя ' + userfio + ' в проект'
      this.selectedUser = user
    })
  }


  public open() {
    this.isOpen = true;
  }

  public onInput() {
    this.projectsFiltered = this.projects.filter((proj: Projects) => proj.name?.includes(this.searchString))
  }

  public async setUserOnProj() {
    let result = await this.adminService.setUserOnProject(Number.parseInt(this.selectedUser!.id!), this.selectedProject!.id!, this.selectedProject!.name)
    if (result) {
      this.toastService.show(MessageType.Success, 'Пользователь успешно назначен на проект!')
      this.isOpen = false;
    }
  }
}
