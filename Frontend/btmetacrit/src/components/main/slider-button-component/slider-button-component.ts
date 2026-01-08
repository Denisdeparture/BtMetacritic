import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-slider-button-component',
  imports: [],
  templateUrl: './slider-button-component.html',
  styleUrl: './slider-button-component.scss',
})
export class SliderButtonComponent {
  readonly offset = input.required<number>();
  readonly rotate = input.required<number>();
  readonly side = input.required<'RIGHT' | 'LEFT'>();
  readonly slideChange = output<TransformSlide>();

  click(): void {
    this.slideChange.emit({
      side: this.side(),
      offset: this.offset(),
    });
  }
}
export type TransformSlide = {
  offset: number;
  side: 'RIGHT' | 'LEFT';
};
