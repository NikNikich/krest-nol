import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDivWidth]'
})
export class DivWidthDirective implements OnInit {
  @Input('appDivWidth') width: string = '100px';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const {nativeElement} = this.element;
    this.renderer.setStyle(nativeElement, 'width', this.width);
    this.renderer.setStyle(nativeElement, 'height', this.width);
  }
}

