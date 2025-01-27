import { Component, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent extends BaseComponent {

  @Input() executors: User[] = [];
}
