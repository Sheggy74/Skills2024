import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { ProjectService } from '../../services/project.service';
import { Projects } from 'src/app/Models/Projects';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { filter } from 'cypress/types/bluebird';
import { BehaviorSubject, map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { UserRoleService } from '../../services/user-role.service';
import { Tags } from 'src/app/Models/Tags';
import { TagsService } from '../../services/tags.service';
import { TagsprService } from '../../services/tagspr.service';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  private router=inject(Router);
  private searchTextSubject = new BehaviorSubject<string>('');
  private searchTags=new BehaviorSubject<Tags|undefined>(undefined);
  private userRoleService=inject(UserRoleService);
  tagsService=inject(TagsService);
  
  searchText$ = this.searchTextSubject.asObservable();
  searchTags$=this.searchTags.asObservable();
  projects:any;
  // Инициализация searchText как пустой строки
  searchText: string = '';
  items: any[];
  filteredProjects: Projects[] = [];
  @ViewChild(AddProjectComponent) child: AddProjectComponent | undefined;
  selectedTags:Tags[]=[];
  tagModify:Tags={};
 

  constructor(public projectService: ProjectService) {
    // super();
    this.items = [
      {
          label: 'Изменить',
          icon:'pi pi-pencil',
          command: () => {
            this.child?.showDialog();
          }
      },
      {
          label: 'Удалить',
          icon:'pi pi-trash',
          command: async () => {
              this.projectService.deleteProject(this.projectService.selectedPrject.getValue()?.id??0);
              this.projects = await this.projectService.getProjects();
              this.filteredProjects = this.projects;
          }
      },
  ];
  }

  async ngOnInit(): Promise<void> {
    // Получаем проекты из сервиса с использованием async/await
    this.projects = await this.projectService.getProjects();
    this.projectService.project.subscribe(project=>{
      this.filteredProjects=project;
    })
    // this.filteredProjects = this.projects;
    // Применяем фильтры после получения данных
    this.applyFilters();
    this.tagsService.updateData();
    // Подписка на изменения текста поиска
    this.searchText$.subscribe(() => this.applyFilters());
    this.searchTags$.subscribe(()=>this.applyFilters());
  }

  // Метод для применения фильтров
  private  applyFilters() {
    
    if (this.searchText == '') {
      // Если поле поиска пустое, показываем все проекты

        this.filteredProjects = this.projects;
    } else {
      // Иначе фильтруем проекты по введенному тексту
      const searchText = this.searchText.trim().toLowerCase();
      this.filteredProjects = this.filteredProjects.filter(project =>
        project?.name?.toLowerCase().includes(searchText) ||
        project?.description?.toLowerCase().includes(searchText)
      //   ||
      //   project.tags?.filter(item1 =>
      //     this.selectedTags.some(item2 => item2.id === item1.id)
      // )
    )
    }
    if(this.selectedTags.length!=0){
      console.log(this.selectedTags);
      this.filteredProjects=this.filteredProjects.filter(obj =>
        obj.tags?.some(tag => 
          this.selectedTags.some(searchItem => 
            searchItem.id === tag.id && searchItem.name === tag.name
          )
        )
      );
    }
  }

  // Обработчик изменения текста поиска
  onSearchTextChange(searchText: string) {
    this.searchTextSubject.next(searchText);
  }
  onSearchTagsChange(searchTags:Tags){
    console.log(searchTags);
    this.searchTags.next(searchTags);
  }

  selectProject(project:Projects){
    console.log(project);
    this.projectService.selectedPrject.next(project);
    this.userRoleService.getUserRoleID(project.id??0);
  }
   add(){
    // this.router.navigateByUrl('/projects/add')
   }
   editProject(){
    this.router.navigateByUrl("projects/edit");
   }
   editTag(event:Event){
    event.stopPropagation(); 
   }
   deleteTag (event:Event,id:number){
    event.stopPropagation(); 
    this.tagsService.deleteTags(id);
    this.tagsService.updateData();
   }
}
