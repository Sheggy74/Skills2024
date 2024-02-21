import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-round-button',
    templateUrl: './round-button.component.html',
    styleUrls: ['./round-button.component.css']
})
export class RoundButtonComponent {
    
    @Input() isChecked = false;
    @Output() isCheckedChange : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    @Input() disabled = false
    @Input() rotateToggled: boolean = false;
    @Input() iconClass: string = '';
    @Input() materialIconClass: string = '';
    @Input() styleClass: string = '';
    pressed = false
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>()

    buttonClick(event: MouseEvent) {
        this.isChecked = !this.isChecked
        this.isCheckedChange.next(this.isChecked)
        
        this.pressed = !this.pressed
        event.stopImmediatePropagation()
        this.onClick.emit(event)
    }
}
