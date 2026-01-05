import {
  AfterContentInit,
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
import { Genre, Screenshot } from '../../../types';
import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
const developTransitionImg = transition(':enter', [
  style({ opacity: 0 }),
  animate('0.5s ease-in', style({ opacity: 1 })),
]);

const develop = trigger('developImg', [developTransitionImg]);
@Component({
  animations: [develop],
  selector: 'app-tooltip-component',
  imports: [TextLengthDirective, DatePipe],
  templateUrl: './tooltip-component.html',
  styleUrl: './tooltip-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent implements OnInit {
  renderer = inject(Renderer2);
  host = inject(ElementRef);
  readonly wrapper = viewChild<ElementRef<HTMLDivElement>>('wrapper');
  readonly imagechangeinterval = input<number>(500);
  readonly verticalOffset = input.required<number>();
  readonly horizontalOffset = input.required<number>();
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

    const wrap = this.wrapper();

    if (!wrap) {
      return;
    }

    const tooltipRect = wrap.nativeElement!.getBoundingClientRect();

    const top =
      hostRect.top -
      window.scrollY -
      tooltipRect.height +
      this.verticalOffset()!;

    const left =
      hostRect.left -
      window.scrollX +
      hostRect.width / 2 -
      tooltipRect.width / 2 +
      this.horizontalOffset();

    console.log('Top: ' + top);
    console.log('Left: ' + left);
    this.renderer.setStyle(this.host.nativeElement, 'top', `${top}px`);
    this.renderer.setStyle(this.host.nativeElement, 'left', `${left}px`);
  }
}
export type TooltipInfo = {
  title: string;
  imagesLinks: Screenshot[];
  dateRealese: Date;
  genres: Genre[];
  linkForMoreInfo: string;
  description: string;
};
