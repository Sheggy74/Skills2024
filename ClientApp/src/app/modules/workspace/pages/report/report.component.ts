import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  dateReport:Date=new Date;
  getReport(){
    let year = this.dateReport.getFullYear();
    let month = (this.dateReport.getMonth() + 1).toString().padStart(2, '0'); // Добавляем 1 к месяцу, и форматируем с ведущим нулем
    let day = this.dateReport.getDate().toString().padStart(2, '0'); // Форматируем день с ведущим нулем

    let date = `${year}-${month}-${day}`;
    window.open('http://localhost:8000/api/reportTask/'+date, '_blank');
  }
}
