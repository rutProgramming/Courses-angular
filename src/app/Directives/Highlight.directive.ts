import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight?: string; 

  constructor(private el: ElementRef) {
    this.setBackgroundColor('transparent');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackgroundColor(this.appHighlight || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackgroundColor('transparent');
  }

  private setBackgroundColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
