import { Component, Input } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
  selector: 'app-text-busy-indicator',
  templateUrl: './text-busy-indicator.component.html',
  styleUrls: ['./text-busy-indicator.component.css']
})
export class TextBusyIndicatorComponent extends BaseComponent{

    @Input() caption = "Ожидайте"
    @Input() isBusy = false

    localCaption = ""

    i = 0

    override ngOnInit(){
        super.ngOnInit()

        setInterval(()=>{
            if(this.isBusy == false){
                this.localCaption = ""
                return
            }
            this.localCaption = this.caption 
            for(let x = 0; x < this.i%4; x++){
                this.localCaption += '.'
            }
            this.i++
        },200)
    }

}
