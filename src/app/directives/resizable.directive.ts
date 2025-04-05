import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {
  //injects ElementRef (grants access to the host DOM element through nativeElement property)
  //uses as a reference
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  
  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent) {
    // const threshold = 10;
    // if (event.offsetX < threshold && event.offsetY < threshold) {
    //   this.renderer.setStyle(this.el.nativeElement, 'cursor', 'nwse-resize');
    // } else {
    //   this.renderer.removeStyle(this.el.nativeElement, 'cursor');
    // }
  }
  @HostListener('click', ['$event.target'])
  onClick(event: MouseEvent) {
    
  }
}
