import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent {
    
    @Input() icon = "tune"
    @Input() iconClass = ""
    @Input() disabledClass = "text-gray-400"
    @Input() activeClass = "hover:bg-gray-100 active:bg-blue-100"
    @Input() iconSize = "20px"
    @Input() disabled = false
    @Input() isLoading = false
    @Output() onClick = new EventEmitter<any>()
    
    clicked(event: MouseEvent){
        event.stopImmediatePropagation()
        if(this.isLoading){
            return
        }
        this.onClick.emit(event)
    }
}
