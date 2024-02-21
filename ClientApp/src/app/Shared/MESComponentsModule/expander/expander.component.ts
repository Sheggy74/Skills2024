import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-expander',
  templateUrl: './expander.component.html',
  styleUrls: ['./expander.component.css']
})
export class ExpanderComponent {
  @Input() isExpanded = true;
  @Output() isExpandedChange : EventEmitter<boolean> = new EventEmitter<boolean>();

  changeIsExpanded(){
    this.isExpanded = !this.isExpanded
    this.isExpandedChange.emit(this.isExpanded); 
  }
}
