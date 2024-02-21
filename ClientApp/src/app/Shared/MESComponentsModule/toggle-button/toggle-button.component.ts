import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent {

    @Input() isChecked = false;
    @Output() isCheckedChange : EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() icon = "tune"
    @Input() mirrorVertical = false
    onClick(){
        this.isChecked = !this.isChecked
        this.isCheckedChange.emit(this.isChecked)
    }
}
