import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gridRows]'
})
export class GridRowsDirective {
  @Input("gridRows") gridRowsString = '';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
  }
  ngOnInit(){
    var valueToSet = '';

    var valueArray = this.gridRowsString.split(' ');

    this.renderer.setStyle(this.elementRef.nativeElement, "grid-template-rows", this.gridRowsString);
    this.renderer.setStyle(this.elementRef.nativeElement, "display", 'grid');
  }

}
