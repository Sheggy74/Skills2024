import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent extends BaseComponent {

    @ViewChild("img") img : ElementRef<HTMLElement> | undefined

    @Input() id: string | undefined
    @Input() economyMode = true

    httpClient = inject(HttpClient)

    urlSrc = ''
    loaded = false
    constructor() {
        super()

        setTimeout(()=>{
            if(this.isInViewport()){
                this.loadImage()
                return
            }

            if(this.img == null){
                return
            }
            let observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting){
                    this.loadImage()
                }
            })
            observer.observe(this.img.nativeElement)
        })
    }
    reloadImage() {
        this.loaded = false
        this.urlSrc = ""
        this.loadImage()
    }
    loadImage() {
        if (this.id == null || this.id == '') {
            return
        }
        if (this.loaded == false) {
            this.loaded = true
            setTimeout(async () => {
                if (this.id == null || this.id == '') {
                    return
                }
                /* this.image = await this.imageService.getImage(this.id, this.economyMode); */
               /*  this.urlSrc = 'data:image/jpg;base64,' + this.image.data */
            })
        }
    }
    isInViewport() : boolean{
        var domRect = this.img?.nativeElement.getBoundingClientRect()
        if(domRect == null){
            return false
        }
        let isIn = domRect.top > 0 && 
                    domRect.left > 0 &&
                    domRect.bottom <= (window.innerHeight && document.documentElement.clientHeight) &&
                    domRect.right <= (window.innerWidth && document.documentElement.clientWidth)
        return isIn
    }
}
