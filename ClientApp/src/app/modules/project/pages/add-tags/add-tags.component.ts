import { Component,inject } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Tags } from 'src/app/Models/Tags';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrl: './add-tags.component.css'
})
export class AddTagsComponent {
  tagsService=inject(TagsService);
  display: boolean = false;  // Показывать/скрывать диалог
  tagName: string |undefined;      // Имя тега
  tagNameError: boolean = false;  // Ошибка при пустом поле
  tag?:Tags;
  // Открытие диалога
  showDialog() {
    this.display = true;
    this.tagNameError = false;
    if(this.tagsService.selectedTag.getValue()){
      this.tagName=this.tagsService.selectedTag.getValue()?.name;
      this.tag=this.tagsService.selectedTag.getValue();
    }else{
      this.tagName = '';       // Очистить поле при открытии диалога
      this.tag={};
    }
  }

  // Закрытие диалога
  hideDialog() {
    this.display = false;
  }

  // Сохранение тега
  saveTag() {
    if (this.tagName?.trim() === '') {
      this.tagNameError = true; // Показываем ошибку, если поле пустое
      return;
    }
    // Здесь можно добавить логику для сохранения тега
    if(this.tagsService.selectedTag.getValue()){
      this.tagsService.editTags(this.tagName??'',this.tag?.id);
    }else{
      this.tagsService.createTags(this.tagName??'');
    }
    
    this.tagsService.updateData();
    this.hideDialog();  // Закрываем диалог
  }
}
