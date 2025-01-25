import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from 'src/app/Models/Role';

@Component({
  selector: 'app-role-selector',
  standalone: false,
  templateUrl: './role-selector.component.html',
  styleUrl: './role-selector.component.css'
})
export class RoleSelectorComponent {

  @Input() roles: Role[] = [];

  @Output() procceed: EventEmitter<Role> = new EventEmitter<Role>();

  selectedRole: any;

  constructor(){
    console.log(this.roles);

  }


  selectRole(role: Role) {
    this.selectedRole = role;
  }

  proceedToForm() {
      this.procceed.emit(this.selectedRole);
  }
}
