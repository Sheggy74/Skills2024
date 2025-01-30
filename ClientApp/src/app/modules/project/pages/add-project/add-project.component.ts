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

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit{

  async ngOnInit(): Promise<void> {
    this.userRoleService.updateData();
    this.users= await this.userRoleService.getUserRole();
    this.projectService.projectID.subscribe(project=>{
      this.addEditTags(project?.id);
    });
    this.projectTagsService.tagsID.subscribe(tags=>{
      this.projectService.updateData();
    })
    
  }
  visible: boolean = false;
  activeIndex: number = 0;  // Индекс текущего шага
  projectTitle: string |undefined='Ваш новый проект';
  projectDescription: string|undefined = '';
  selectedIcon: string|undefined = 'pi pi-book';
  selectedIconColor: string = this.getRandomColor(); // Стартовый цвет иконки (черный)
  _selectedUsers: UserRole[] = [];
  displayIconDialog: boolean = false;  // Флаг для отображения диалогового окна
  nameFilter: string = '';
  roleFilter: string = '';
  userRoleService=inject(UserRoleService);
  projectService=inject(ProjectService);
  tagsService=inject(TagsService);
  projectTagsService=inject(TagsprService);
  users!: any[];
  createProject:Projects={};
  isDisabled:boolean=true;
  addEditBtn:string='Создать';
  selectTags:Tags[]=[];
  retPrID:any;
  arrayTagsPr:TagsProject[]=[];
  searchTag:TagsProject[]=[];


  showDialog() {
    this.visible = true;
    this.isAddEditFunction();
}

  get selectedUsers():UserRole[]{
    return this._selectedUsers;
  }
  set selectedUsers(newValue:UserRole[]){
    this._selectedUsers=newValue;
    this.isDisabled=newValue.length===0?true:false;
    console.log(this.selectedUsers);
  }

  roles = [
    { label: 'Администратор', value: 'admin' },
    { label: 'Пользователь', value: 'user' },
    { label: 'Менеджер', value: 'manager' },
  ];

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
    { label: 'Выбор менеджера проекта' }
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
    this.projectService.updateData();
    
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
      this.selectedUsers=this.userRoleService.selectedUsers.getValue()??[];
      this.projectTitle= project?.name;
      this.projectDescription= project?.description;
      this.selectedIcon= project?.icon;
      this.addEditBtn='Изменить';
      this.selectTags=project?.tags??[];
      console.log(this.selectedUsers)
    }else{
      this.projectTitle= 'Ваш новый проект';
      this.projectDescription= '';
      this.selectedIcon= 'pi pi-book';
      this.selectedUsers = [];
      this.addEditBtn='Создать';
      this.selectedIconColor= this.getRandomColor();
    }
  }
  
}
