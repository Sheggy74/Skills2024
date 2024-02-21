import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent extends BaseComponent {

  constructor(){
    super();
  }
  changeVisibilityClick(){
  }
}
