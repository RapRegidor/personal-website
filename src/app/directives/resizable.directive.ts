import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective {
  //injects ElementRef (grants access to the host DOM element through nativeElement property)
  //uses as a reference
  private el = inject(ElementRef);
  @HostListener('mouseenter') onMouseEnter() {
    
  }
  @HostListener('mouseleave') onMouseLeave() {
  }
}
