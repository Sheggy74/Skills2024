import { Component, Input } from '@angular/core';
import { Task } from 'src/app/Models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: any = {id: 0, name: ''};
  taskWidth: number = 300
  iter: number[] = [1,2,3,4,5]
  colors: any[] = [
    {
      priorityId: 1,
      color: '#7FA7E4'
    },
    {
      priorityId: 2,
      color: '#CFC653'
    },
    {
      priorityId: 3,
      color: '#EF6F61'
    },
  ]
  taskColor: string = '';

  ngOnInit() {
    this.taskColor = this.colors.filter(el => {      
      return el.priorityId === this.task.priority_id;
    })[0].color;  
    if(this.task.iscompleted)
      this.taskColor = '#72B992';
    
    this.taskWidth = this.taskWidth + this.task.days * 10
  }
}
