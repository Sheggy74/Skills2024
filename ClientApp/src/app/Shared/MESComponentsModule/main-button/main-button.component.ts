import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.css']
})
export class MainButtonComponent {
    @Output() onClick = new EventEmitter<any>()

    clicked(event : any){
        this.onClick.emit(event)
    }
}
