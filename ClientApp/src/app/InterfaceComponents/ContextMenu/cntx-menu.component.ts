import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { ProjectListComponent } from 'src/app/modules/project/pages/project-list/project-list.component';

@Component({
  selector: 'app-cntx-menu',
  templateUrl: './cntx-menu.component.html',
  styleUrl: './cntx-menu.component.css'
})
export class CntxMenuComponent extends BaseComponent{

  // @ViewChild('cm') cm:ContextMenu | undefined;
  @Input() model:MenuItem[]=[];
  @Input() target:any|undefined;
  

  constructor(){
    super();
    // this.items=[
    //   {label:'sef',icon:'pi pi-star'}
    // ];
  }

  // onContextMenu(event:Event){
  //   console.log(this.target);
  //   event.preventDefault();
  //   this.cm?.show();
  // }

  // onHide(){
    
  // }
}
