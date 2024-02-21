import { outputAst } from '@angular/compiler';
import { Directive, ElementRef, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gridColumns]'
})
export class GridColumnsDirective {
  @Input("gridColumns") gridColumnsString = '';
  
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { 
    
  }
  ngOnChanges(){
    var valueToSet = '';

    var valueArray = this.gridColumnsString.split(' ');

    this.renderer.setStyle(this.elementRef.nativeElement, "grid-template-columns", this.gridColumnsString);
    this.renderer.setStyle(this.elementRef.nativeElement, "display", 'grid');
  }
  
  ngOnInit(){
   
  }

}
