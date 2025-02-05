import { CSP_NONCE, Component, inject } from '@angular/core';
import { TaskWorkService } from '../../services/task-work.service';
import { Task } from 'src/app/Models/Task';
import { ReportTask } from 'src/app/Models/reportTask';
import { InputNumberInputEvent } from 'primeng/inputnumber';
import { number } from 'echarts';
import { concat } from 'rxjs';
import { PlanService } from '../../services/plan.service';

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
  disable:boolean=true;
  planService = inject(PlanService);
  
  ngOnInit(){
    this.reportService.getTasks();
    this.reportService.tasks.subscribe(item=>{
      item.forEach(el=>{
        el.date=new Date()
      })
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
      console.log('save el',el);
      this.reportService.createProjects(el);
    });
    this.selectedTasks=[];
    this.planService.getTasks();
    this.reportService.getTasks();
  }

  inputPercent(event:InputNumberInputEvent,task:ReportTask){
    if(!task.percent){
      task.validPercent=true;
      this.disable=true;
    }else{
      task.validPercent=false;
      this.disable=false;
    }
  }
  inputDescription(event:any,task:ReportTask){
    
    if(!task.description){
      task.validDescription=true;
      this.disable=true;
    }else{
      task.validDescription=false;
      this.disable=false;
    }
  }
  onCheckboxChange(event:any){
    console.log(event);
    let data=event.data;
    
      this.tasks.forEach(el=>{
        if(el.task_id==event.data.task_id){
          if(!event.data.percent){
            el.validPercent=true;
            el.validDescription=true;
            this.disable=true;
          }else{
            el.validPercent=false;
            el.validDescription=false;
            this.disable=false;
          }
        
        }
      });
    
    // console.log(task);
    //[ngClass]="{ 'ng-invalid': isInvalid(date), 'ng-dirty': isDirty(date) }">
  }

  onCheckboxChangeRemove(event:any){
    console.log(event);
    if(this.selectedTasks.length==0){
      this.disable=true;
    }
    this.tasks.forEach(el=>{
      if(el.task_id==event.data.task_id){
       
          el.validPercent=false;
          el.validDescription=false;
          this.disable=false;
        
      
      }
    });
  
  }
   // Пример проверки валидности
   isInvalid(date: Date): boolean {
    return !date;  // Пример: если дата не установлена, считаем, что она недействительна
  }

  // Пример проверки измененности
  isDirty(date: Date): boolean {
    return !!date;  // Пример: если дата установлена, она считается измененной
  }
}
