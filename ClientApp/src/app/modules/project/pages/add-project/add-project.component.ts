import { Component, inject, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from 'src/app/Models/UserRole';
import { ProjectService } from '../../services/project.service';
import { Projects } from 'src/app/Models/Projects';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{

  async ngOnInit(): Promise<void> {
    this.userRoleService.updateData();
    this.users= await this.userRoleService.getUserRole();
    console.log(this.users);
  }
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  activeIndex: number = 0;  // Индекс текущего шага
  projectTitle: string = '';
  projectDescription: string = '';
  selectedIcon: string = '';
  selectedIconColor: string = this.getRandomColor(); // Стартовый цвет иконки (черный)
  selectedUsers: UserRole[] = [];
  displayIconDialog: boolean = false;  // Флаг для отображения диалогового окна
  nameFilter: string = '';
  roleFilter: string = '';
  userRoleService=inject(UserRoleService);
  projectService=inject(ProjectService);
  users!: any[];
  createProject:Projects={};

  // users = [
  //   { name: 'John Doe', role: 'Admin' },
  //   { name: 'Jane Smith', role: 'User' },
  //   { name: 'Alice Johnson', role: 'Editor' },
  //   { name: 'Bob Brown', role: 'User' },
  //   { name: 'Charlie White', role: 'Admin' },
  //   { name: 'David Green', role: 'Editor' }
  // ];

  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
    { label: 'Manager', value: 'manager' },
  ];

  icons = [
    { label: 'Home', value: 'pi pi-home' },
    { label: 'Work', value: 'pi pi-briefcase' },
    { label: 'Settings', value: 'pi pi-cog' },
    { label: 'Users', value: 'pi pi-users' },
    { label: 'Search', value: 'pi pi-search' },
    { label: 'Star', value: 'pi pi-star' },
    { label: 'Cog', value: 'pi pi-cog' }
  ];

  steps = [
    { label: 'О проекте' },
    { label: 'Выбор менеджера проекта' }
  ];

  onStepChange(event: any) {
    console.log('Step changed', event);
  }

  onFinish() {
    // Сюда добавляем логику для сохранения или отправки данных на сервер
    console.log('Project created:', {
      title: this.projectTitle,
      description: this.projectDescription,
      icon: this.selectedIcon,
      iconColor: this.selectedIconColor,
      users: this.selectedUsers
    });
  }

  openIconDialog() {
    this.selectedIconColor=this.getRandomColor();
    this.displayIconDialog = true;  // Открыть модальное окно для выбора иконки
  }

  selectIcon(icon: string) {
    this.selectedIcon = icon;  // Установить выбранную иконку
    this.displayIconDialog = false;  // Закрыть модальное окно
  }

   getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(this.selectedUsers);
    return color;
  }
  addProject(){
    this.createProject.name=this.projectTitle;
    this.createProject.description=this.projectDescription;
    this.createProject.icon=this.selectedIcon;
    this.createProject.theme=this.selectedIconColor
  

    this.projectService.createProjects(this.createProject,this.selectedUsers);
  }
}
