import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { UserRole } from 'src/app/Models/UserRole';
import { ProjectUserService } from '../../services/project-user.service';
import { WorkspaceService } from '../../services/workspace.service';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-select-executor',
  templateUrl: './select-executor.component.html',
  styleUrl: './select-executor.component.css'
})
export class SelectExecutorComponent {
  @Input() isManagerOrAdmin: boolean = false;
  @Input() task!: Task;
  @Output() visibleChange = new EventEmitter<boolean>();
  private projectUserSevice = inject(ProjectUserService);
  private workspaceSevice = inject(WorkspaceService);
  projectUsers: UserRole[] = [];
  selectedExecutor!: UserRole;
  visible: boolean = false;

  ngOnInit() {
    this.projectUserSevice.projectUser.subscribe(projectUsers => {
      this.projectUsers = projectUsers;
    })
  }

  showDialog() {
    if (this.isManagerOrAdmin)
      this.visible = true;
  }

hideDialog() {
  this.visible = false;
  this.visibleChange.emit(this.visible);
}

onSubmit() {
  this.task.executorId = this.selectedExecutor.id;
  this.workspaceSevice.editTask(this.task.id, this.task);
  this.hideDialog();
}
}
