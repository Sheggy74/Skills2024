import { Component } from '@angular/core';
import { Application } from 'src/app/Models/Application';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-myapplications',
  templateUrl: './myapplications.component.html',
  styleUrls: ['./myapplications.component.css']
})
export class MyapplicationsComponent extends BaseComponent {
  applications : Application[] = [];
  respresentatives: any[] = [
    {name: "Amy Elsner", image: 'amyelsner.png'},
    {name: "Anna Fali", image: 'annafali.png'},
    {name: "Asiya Javayant", image: 'asiyajavayant.png'},
    {name: "Bernardo Dominic", image: 'bernardodominic.png'},
    {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
    {name: "Ioni Bowcher", image: 'ionibowcher.png'},
    {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
    {name: "Onyama Limba", image: 'onyamalimba.png'},
    {name: "Stephen Shaw", image: 'stephenshaw.png'},
    {name: "Xuxue Feng", image: 'xuxuefeng.png'}
];
  override async ngOnInit(){
    super.ngOnInit()
    this.applications = [{author:"Иванов А.А."}]




}
}
