import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { TextLengthDirective } from '../../../directives/text-length-directive';
import { Screenshot } from '../../../types';
import { animate, style, transition, trigger } from '@angular/animations';
const developTransitionImg = transition(':enter', [
  style({ opacity: 0 }),
  animate('0.5s ease-in', style({ opacity: 1 })),
]);

const develop = trigger('developImg', [developTransitionImg]);
@Component({
  animations: [develop],
  selector: 'app-tooltip-component',
  imports: [TextLengthDirective],
  templateUrl: './tooltip-component.html',
  styleUrl: './tooltip-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit {
  renderer = inject(Renderer2);
  host = inject(ElementRef);
  readonly wrapper = viewChild<HTMLDivElement>('wrapper');
  readonly conditiondisplay = input.required<boolean>();
  readonly imagechangeinterval = input<number>(500);
  readonly verticalOffset = input.required<number>();
  readonly width = input<number>(200);
  readonly height = input<number>(100);
  readonly info = input.required<TooltipInfo>();
  readonly maxlength = input<number>(25);

  readonly countScreens = computed(() => this.info().imagesLinks.length - 1);
  readonly activeIndex = signal(0);
  ngOnInit(): void {
    this.setPosition();
    setInterval(() => {
      this.changeMainImage();
    }, this.imagechangeinterval());
  }
  changeMainImage(): void {
    this.activeIndex.update((x) => {
      if (x >= this.countScreens()) {
        x = 0;
      } else {
        x += 1;
      }
      return x;
    });
  }
  setPosition(): void {
    const hostRect = this.host.nativeElement.getBoundingClientRect();

    const tooltipRect = this.wrapper()!.getBoundingClientRect();

    const top =
      hostRect.top -
      window.scrollY -
      tooltipRect.height +
      this.verticalOffset()!;

    const left =
      hostRect.left -
      window.scrollX +
      hostRect.width / 2 -
      tooltipRect.width / 2;

    this.renderer.setStyle(this.wrapper, 'top', `${top}px`);
    this.renderer.setStyle(this.wrapper, 'left', `${left}px`);
  }
}
export type TooltipInfo = {
  title: string;
  imagesLinks: Screenshot[];
  dateRealese: Date;
  genre: string;
  linkForMoreInfo: string;
  description: string;
};
