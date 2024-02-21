import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter,  Input,  OnInit, Output, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BehaviorSubject } from 'rxjs';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
    selector: 'app-file-selector',
    templateUrl: './file-selector.component.html',
    styleUrls: ['./file-selector.component.css']
})
export class FileSelectorComponent extends BaseComponent {

    @ViewChild("overlayError") overlayError : OverlayPanel | undefined
    @ViewChild("fileUpload") fileUpload : ElementRef<any> | undefined
    @Input() fileName = '';
    @Input() extensions : string[] = []
    @Output() fileChanged: EventEmitter<File> = new EventEmitter<File>();
    error = 'Расширение .${extension} недопустимо'
    @Input() twClass = ''
    @Input() sizeLimit = 10 //MBs

    lastEvent : MouseEvent | undefined

    override ngOnInit(){
        super.ngOnInit()
        
    }

    async onFileSelected(event: any) {
        if(event.target.files.length < 1){
            return
        }
        const file: File = event.target.files[0];
        let array = file.name.split('.')
        let extension = array[array.length-1]
        if(file.size > 1048576 * this.sizeLimit ){
            this.error = `Размер файла не должен превышать ${this.sizeLimit}MB`
            this.overlayError?.show(this.lastEvent)
            return 
        }
        if (this.extensions.includes(extension.toLowerCase()) == false){
            this.error = `Расширение .${extension} недопустимо`
            this.overlayError?.show(this.lastEvent)
            return 
        }

        this.fileChanged.emit(file)
    }
    getExtensionString() : string{
        return this.extensions.map((extension)=>{
            return "." + extension
        }).join(',')
    }
    buttonClick(event : MouseEvent){
        this.fileUpload?.nativeElement.click()
        this.lastEvent = event
    }
}
