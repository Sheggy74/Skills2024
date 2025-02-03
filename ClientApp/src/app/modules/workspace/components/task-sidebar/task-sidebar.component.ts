import { Component, inject} from '@angular/core';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-task-sidebar',
  templateUrl: './task-sidebar.component.html',
  styleUrl: './task-sidebar.component.css'
})
export class TaskSidebarComponent {
  visible : boolean = false;
  private workspaceService = inject(WorkspaceService);


  sidebarWidth: number = 500;  // Начальная ширина сайдбара
  isResizing: boolean = false;
  lastX: number = 0;

  ngOnInit() {
    this.workspaceService.sidebarVisible.subscribe(visible => {
      this.visible = visible;
      console.log("visibleSidebar = " + this.visible);
      
    })
  }

  tabs = [
    { label: 'Чат', content: 'Content of Tab 1' },
    { label: 'Редактирование', content: 'Content of Tab 2' },
    { label: 'Исполнители', content: 'Content of Tab 3' }
  ];

  closeSidebar() {
    this.workspaceService.closeSidebarVisible();
  }
}
