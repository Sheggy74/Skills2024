import { Component, inject, OnInit } from '@angular/core';
import { UserRoleService } from '../../services/user-role.service';
import { UserRole } from 'src/app/Models/UserRole';
import {TagsProject} from 'src/app/Models/TagsProject';
import { ProjectService } from '../../services/project.service';
import { Projects } from 'src/app/Models/Projects';
import { User } from 'src/app/Models/User';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { TagsService } from '../../services/tags.service';
import { Tags } from 'src/app/Models/Tags';
import { TagsprService } from '../../services/tagspr.service';
import { RoleprojectService } from '../../services/roleproject.service';
import { RoleProject } from 'src/app/Models/RoleProject';
import { TableRowSelectEvent } from 'primeng/table';
import { UserRolePr } from 'src/app/Models/UserRolePr';

interface User1 {
  id: number;
  name: string;
  selectedRole: string;  // Роль будет храниться в этом поле
}

interface Role1 {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{

  async ngOnInit(): Promise<void> {
    this.userRoleService.updateData();
    // this.users= await this.userRoleService.getUserRole();
    this.projectService.projectID.subscribe(project=>{
      this.addEditTags(project?.id);
    });
    this.projectTagsService.tagsID.subscribe(tags=>{
      this.projectService.updateData();
    })
    let user = JSON.parse(localStorage.getItem('[ATOM24][jwtDTO]')??'');
    this.roleUser=user?.user?.login;
    this.rolePrService.updateData();
    this.rolePrService.roleProjects.subscribe(roles=>{
      this.rolePr=roles;
    });
    this.userRoleService.users.subscribe(item=>{
      this.users=item;
      this.selectedUsers=item.filter(el=>el.isSelected==true);
    })
    // this.userRoleService.selectedRoleUsers.subscribe(el=>{
    //   this.selectedUsers=el??[];
    // })

  }
  visible: boolean = false;
  activeIndex: number = 0;  // Индекс текущего шага
  projectTitle: string |undefined='Ваш новый проект';
  projectDescription: string|undefined = '';
  selectedIcon: string|undefined = 'pi pi-book';
  selectedIconColor: string = this.getRandomColor(); // Стартовый цвет иконки (черный)
  _selectedUsers: UserRolePr[] = [];
  displayIconDialog: boolean = false;  // Флаг для отображения диалогового окна
  nameFilter: string = '';
  roleFilter: string = '';
  userRoleService=inject(UserRoleService);
  projectService=inject(ProjectService);
  tagsService=inject(TagsService);
  projectTagsService=inject(TagsprService);
  // users: UserRolePr[]|any[]=[];
  createProject:Projects={};
  isDisabled:boolean=false;
  addEditBtn:string='Создать';
  selectTags:Tags[]=[];
  retPrID:any;
  arrayTagsPr:TagsProject[]=[];
  searchTag:TagsProject[]=[];
  header:string='';
  roleUser:string='';
  rolePrService=inject(RoleprojectService);
  rolePr:RoleProject[]=[];
  selectRolePr:RoleProject={};
  showWarning: boolean = false;
  showDialog() {
    this.visible = true;
    this.isAddEditFunction();
  }
  users:UserRolePr[]=[];

users1: User1[] = [
  { id: 1, name: 'Иван Иванов', selectedRole: 'admin' },
  { id: 2, name: 'Петр Петров', selectedRole: 'editor' },
  { id: 3, name: 'Сергей Сергеев', selectedRole: 'viewer' },
];

// Доступные роли
roles1: Role1[] = [
  { name: 'Администратор', code: 'admin' },
  { name: 'Редактор', code: 'editor' },
  { name: 'Просмотрщик', code: 'viewer' },
];

// Массив для хранения выбранных пользователей
selectedUsers1: User1[] = [];

  // get selectedUsers():UserRolePr[]{
  //   return this._selectedUsers;
  // }
  // set selectedUsers(newValue:UserRolePr[]){
  //   this._selectedUsers=newValue;
  //   this.isDisabled=newValue.length===0?true:false;
  //   console.log(this.selectedUsers);
  // }

  selectedUsers: { id: number; fio: string; role_id: number,isSelected:boolean }[] = [];

  // Данные для предварительно выбранных пользователей
  selectRows = [
    { id: 1, role_id: 2 },
    { id: 2, role_id: 2 }
  ];

  roles = [
    { role_id: 2, name: "исполнитель" },
    { role_id: 1, name: "менеджер" }
  ];
  // users = [
  //   { id: 1, fio: "Gladyce ru", role_id: 2 },
  //   { id: 2, fio: "Marley re", role_id: 2 },
  //   { id: 3, fio: "Jaren ef", role_id: 2 },
  //   { id: 4, fio: "Dorcas ao", role_id: 2 },
  //   { id: 5, fio: "Meda ir", role_id: 2 },
  //   { id: 6, fio: "Odessa ic", role_id: 2 },
  //   { id: 7, fio: "Gage le", role_id: 2 },
  //   { id: 8, fio: "Vernon so", role_id: 2 },
  //   { id: 9, fio: "Susie at", role_id: 2 },
  //   { id: 10, fio: "Erika ic", role_id: 2 },
  //   { id: 11, fio: "Lenore ae", role_id: 2 },
  //   { id: 12, fio: "Lisette ho", role_id: 2 }
  // ];
  icons = [
    { label: 'Молния', value: 'pi pi-bolt' },
    { label: 'Работа', value: 'pi pi-briefcase' },
    { label: 'Settings', value: 'pi pi-calculator' },
    { label: 'Users', value: 'pi pi-users' },
    { label: 'Search', value: 'pi pi-asterisk' },
    { label: 'Star', value: 'pi pi-star' },
    { label: 'Cog', value: 'pi pi-crown' },
    { label: 'Cog', value: 'pi pi-compass' },
    { label: 'Cog', value: 'pi pi-face-smile' }
  ];

  steps = [
    { label: 'О проекте' },
    { label: 'Выбор доступа к проекту' }
  ];

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
    if(this.addEditBtn=='Создать'){
      this.retPrID =this.projectService.createProjects(this.createProject,this.selectedUsers);
      
    }else{
      this.projectService.editProject(this.createProject,this.selectedUsers,this.projectService.selectedPrject.getValue()?.id);
     
      this.addEditTags(this.projectService.selectedPrject.getValue()?.id);
    }
    // this.users.forEach(el=>{
    //   el.role_id=undefined;
    // })
    this.selectedUsers=[];
    this.projectService.updateData();
    this.visible=false;
    
  }

  addEditTags(id?:number){
    this.selectTags.forEach(element => {
      this.arrayTagsPr.push({'project_id':id,'tags_id':element.id});
      if(!this.projectService.selectedPrject.getValue()?.tags?.find(el=>el.id===element.id)){
        let t =this.arrayTagsPr.findIndex(m=>m.tags_id===element.id);
        this.searchTag.push(this.arrayTagsPr[t]);
        this.projectTagsService.createTags(this.searchTag);
        this.searchTag=[];
      }
    });
    let notInProjectTags = this.projectService.selectedPrject.getValue()?.tags?.filter(item => !this.selectTags.includes(item));
    notInProjectTags?.forEach(el=>{
      this.projectTagsService.deleteTags(this.projectService.selectedPrject.getValue()?.id??0,el.id??0);
    })
    console.log(this.arrayTagsPr);
    
    this.arrayTagsPr=[];
  }

  isAddEditFunction(){
    if(this.projectService.selectedPrject.value){
      let project=this.projectService.selectedPrject.getValue();
      // this.selectedUsers=this.userRoleService.selectedUsers.getValue()??[];
      // this.selectedUsers=project?.selectRows??[];
      this.projectTitle= project?.name;
      this.projectDescription= project?.description;
      this.selectedIcon= project?.icon;
      this.addEditBtn='Изменить';
      this.selectTags=project?.tags??[];
      this.header='Изменить проект';
      console.log(this.selectedUsers)
      // this.selectedUsers = this.users.filter(user =>
      //   project?.selectRows?.some(selected => selected.id === user.id)
      // );
    }else{
      this.projectTitle= '';
      this.projectDescription= '';
      this.selectedIcon= 'pi pi-book';
      this.selectedUsers = [];
      this.addEditBtn='Создать';
      this.selectedIconColor= this.getRandomColor();
      this.selectTags=[];
      this.header='Создать проект';
    }
  }
  onRowSelect(event:TableRowSelectEvent){
//     const rowData = event.data; // Данные выбранной строки
// console.log(event.data);
//     // Проверяем, выбран ли в dropdown какой-либо элемент
//     if (!rowData.role) {
//       // Если не выбран, показываем предупреждение и сбрасываем выбор строки
//       this.selectedUsers=this.selectedUsers.filter(el=>el.role_id!=null);
//       this.showWarning = true;
//       // this.isDisabled=true;
//       return;
//     }
//     this.showWarning = false;
//     console.log('Выбранная строка:', rowData);
  }
  closeWarning() {
    this.showWarning = false;
  }
  
}
