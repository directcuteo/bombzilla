import { Directive, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit {

  @Input() initialPosition: { x: number, y: number } = { x: 0, y: 0 };

  @Output() bombDrop = new EventEmitter<void>();

  private element: HTMLElement;

  constructor(private elementRef: ElementRef<HTMLElement>,
              private renderer2: Renderer2,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    this.applyXYValues(this.initialPosition.x, this.initialPosition.y);
    this.initDrag();
  }

  private initDrag(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown').pipe(untilDestroyed(this));
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup').pipe(untilDestroyed(this));
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(untilDestroyed(this));

    let initialX: number;
    let initialY: number;
    let currentX = this.initialPosition.x;
    let currentY = this.initialPosition.y;

    let dragSub: Subscription;

    dragStart$.subscribe((event: MouseEvent) => {
      initialX = event.clientX - currentX;
      initialY = event.clientY - currentY;
      this.renderer2.addClass(this.element, 'free-dragging');

      dragSub = drag$.subscribe((event: MouseEvent) => {
        event.preventDefault();

        currentX = event.clientX - initialX;
        currentY = event.clientY - initialY;

        this.applyXYValues(currentX, currentY);
      });
    });

    dragEnd$.subscribe(() => {
      initialX = currentX;
      initialY = currentY;
      if (this.element.classList.contains('free-dragging')) {
        this.renderer2.removeClass(this.element, 'free-dragging');
        this.bombDrop.emit();
      }
      if (dragSub) {
        dragSub.unsubscribe();
      }
    });
  }

  private applyXYValues(x: number, y: number): void {
    this.renderer2.setStyle(this.element, 'transform', 'translate3d(' + x + 'px, ' + y + 'px, 0)');
  }
}
