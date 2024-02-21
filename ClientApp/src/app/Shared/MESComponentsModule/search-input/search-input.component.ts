import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent extends BaseComponent{
    @Input() searchText = ''
    @Output() searchTextChange = new EventEmitter<string>()
    @Input() placeholder = "Поиск"
    
    constructor(){
        super()
    }

    textChanged() {
        this.searchTextChange.emit(this.searchText)
    }
}
