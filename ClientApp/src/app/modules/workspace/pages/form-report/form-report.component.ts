import { Component, inject } from '@angular/core';
import { TaskWorkService } from '../../services/task-work.service';
import { Task } from 'src/app/Models/Task';
import { ReportTask } from 'src/app/Models/reportTask';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { number } from 'echarts';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrl: './form-report.component.css'
})
export class FormReportComponent {
  reportService=inject(TaskWorkService);
  tasks:ReportTask[]=[];
  visible:boolean=false;
  selectedTasks:ReportTask[]=[];
  validPercent:boolean=false;
  percentValid:string='';
  ngOnInit(){
    this.reportService.getTasks();
    this.reportService.tasks.subscribe(item=>{
      this.tasks=item;
    })
  }

  onShow(){
    this.reportService.getTasks();
    this.visible=true;
  }

  save(){
    console.log('save',this.selectedTasks);
    this.selectedTasks.forEach(el=>{
      this.reportService.createProjects(el);
    });
    this.reportService.getTasks();
  }

  inputPercent(event:InputNumberInputEvent,task:ReportTask){
    if(task.oldPercent){
      if(Number(event.value)>task.oldPercent||task.oldPercent+Number(event.value)>100){
        console.log(event.value)
        this.validPercent=true;
      }else{
        this.validPercent=false;
      }
    }
    this.validPercent=false;
  }
}
