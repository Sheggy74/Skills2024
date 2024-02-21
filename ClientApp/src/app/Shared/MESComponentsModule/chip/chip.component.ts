import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css']
})
export class ChipComponent {
    @Input() chipType : string = 'Success'
    @Input() icon : string = ''
    @Input() caption : string = ''

    backgroundColor = '#F3FEE7'
    textColor = '#3B7C0F'
    chipColor = '#3B7C0F'

    parentStyle : any = {}
    actualChipType : ChipType = ChipType.Success
    styleClass : string = ''
    ngOnInit(){
        this.refreshChipTypeByString();
        this.refreshStylesBySelectedChipType()
    }
    refreshStylesBySelectedChipType(){
        if(this.actualChipType == ChipType.Success){
            this.backgroundColor = '#F3FEE7'
            this.textColor = '#3B7C0F'
            this.chipColor = '#66C61C'
        }
        if(this.actualChipType == ChipType.Warn){
            this.backgroundColor = '#FEFBE8'
            this.textColor = '#A15C07'
            this.chipColor = '#EAAA08'
        }
        if(this.actualChipType == ChipType.Slate){
            this.backgroundColor = '#EEF2F6'
            this.textColor = '#364152'
            this.chipColor = '#697586'
        }
        if(this.actualChipType == ChipType.Error){
            this.backgroundColor = '#FFF4ED'
            this.textColor = '#B42318'
            this.chipColor = '#F04438'
        }
    }
    ngOnChanges(){
        this.refreshChipTypeByString()
        this.refreshStylesBySelectedChipType()
    }
    refreshChipTypeByString(){
        //Определяем, какой chip нужно показывать
        for(let i = 0; i < 100; i++){
            var chipTypeString = ChipType[i]
            if(chipTypeString == null){
                break
            }
            if(chipTypeString == this.chipType){
                this.actualChipType = i
                break;
            }
        }
    }
}
export enum ChipType{
    Success = 0,
    Warn = 1,
    Slate = 2,
    Error = 3
}