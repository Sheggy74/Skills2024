import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  getReport(){
    window.open('https://v17.primeng.org/button', '_blank');
  }
}
