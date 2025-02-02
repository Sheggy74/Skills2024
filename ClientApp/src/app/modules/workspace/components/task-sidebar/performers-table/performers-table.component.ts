// import { Componen, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-performers-table',
//   standalone: true,
//   imports: [],
//   templateUrl: './performers-table.component.html',
//   styleUrl: './performers-table.component.css'
// })
// export class PerformersTableComponent {
//   @Input() isManagerOrAdmin: boolean = false;
//     @Input() task!: Task;
//     private projectUserSevice = inject(ProjectUserService);
//     private workspaceSevice = inject(WorkspaceService);
//     projectUsers: UserRole[] = [];
//     selectedPerformers: UserRole[] = [];
//     visible: boolean = false;
  
//     ngOnInit() {
//       this.projectUserSevice.projectUser.subscribe(projectUsers => {
//         this.projectUsers = projectUsers;
//       })
//     }
  
//     showDialog() {
//       if (this.isManagerOrAdmin)
//         this.visible = true;
//     }
  
//   hideDialog() {
//     this.visible = false;
//     this.visibleChange.emit(this.visible);
//   }
  
//   onSubmit() {
//     this.task.performersId = this.selectedPerformers.map(performer => performer.id ?? 0);
//     console.log(this.selectedPerformers);
    
//     this.workspaceSevice.editTask(this.task.id, this.task);
//     this.hideDialog();
//   }
// }
