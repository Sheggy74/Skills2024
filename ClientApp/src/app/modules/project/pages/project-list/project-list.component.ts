import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { ProjectService } from '../../services/project.service';
import { Projects } from 'src/app/Models/Projects';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { filter } from 'cypress/types/bluebird';
import { BehaviorSubject, map } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit{
  private router=inject(Router);
  private searchTextSubject = new BehaviorSubject<string>('');
  searchText$ = this.searchTextSubject.asObservable();
  projects:any;
  // Инициализация searchText как пустой строки
  searchText: string = '';
  items: any[];
  filteredProjects: Projects[] = [];

  constructor(private projectService: ProjectService) {
    // super();
    this.items = [
      {
          label: 'Изменить',
          icon:'pi pi-pencil',
          command: () => {
              
          }
      },
      {
          label: 'Удалить',
          icon:'pi pi-trash'
          // command: () => {
          //     this.delete();
          // }
      },
  ];
  }

  async ngOnInit(): Promise<void> {
    // Получаем проекты из сервиса с использованием async/await
    this.projects = await this.projectService.getProjects();
    this.filteredProjects = this.projects;

    // Применяем фильтры после получения данных
    this.applyFilters();

    // Подписка на изменения текста поиска
    this.searchText$.subscribe(() => this.applyFilters());
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
      );
    }
  }

  // Обработчик изменения текста поиска
  onSearchTextChange(searchText: string) {
    this.searchTextSubject.next(searchText);
  }

  selectProject(project:Projects){
    this.projectService.selectedPrject.next(project);
  }
   add(){
    // this.router.navigateByUrl('/projects/add')
   }
}
