import { Component ,inject} from '@angular/core';
import { TaskWorkService } from '../../services/task-work.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  dateReport:Date=new Date;
  isManager:boolean=false;
  taskReportService=inject(TaskWorkService);
  user:any;
  btnDisabled:boolean=false;
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('[ATOM24][jwtDTO]')??'');
    console.log(this.user?.user?.id);
    this.taskReportService.getRoleManager(this.user?.user?.id);
    this.taskReportService.isManager.subscribe(el=>{
      this.isManager=el;
    })
    this.taskReportService.getBtnDisabled(this.user?.user?.id);
    this.taskReportService.isBtnDisabled.subscribe(el=>{
      this.btnDisabled=el;
    })
  }
  getReport(){
    let year = this.dateReport.getFullYear();
    let month = (this.dateReport.getMonth() + 1).toString().padStart(2, '0'); // Добавляем 1 к месяцу, и форматируем с ведущим нулем
    let day = this.dateReport.getDate().toString().padStart(2, '0'); // Форматируем день с ведущим нулем

    let date = `${year}-${month}-${day}`;
    window.open('http://localhost:8000/api/reportTask/'+date, '_blank');
  }
  getReportBoss(){
    let year = this.dateReport.getFullYear();
    let month = (this.dateReport.getMonth() + 1).toString().padStart(2, '0'); // Добавляем 1 к месяцу, и форматируем с ведущим нулем
    let day = this.dateReport.getDate().toString().padStart(2, '0'); // Форматируем день с ведущим нулем

    let date = `${year}-${month}-${day}`;
    window.open('http://localhost:8000/api/reportTask/boss/'+this.user?.user?.id+'/'+date, '_blank');
  }
}
