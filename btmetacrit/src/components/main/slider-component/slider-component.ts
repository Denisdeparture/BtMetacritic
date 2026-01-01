import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  HostBinding,
  inject,
  input,
  OnInit,
  signal,
  viewChildren,
} from '@angular/core';
import { SliderGameObject, SliderGroup, SliderObject } from '../../../types';
import { GameGroupComponent } from '../game-group-component/game-group-component';
import { calculateTransformForSlider, centerObjIndex, ISLide } from './helper';
import {
  SliderButtonComponent,
  TransformSlide,
} from '../slider-button-component/slider-button-component';

@Component({
  selector: 'app-slider-component',
  imports: [CommonModule, GameGroupComponent, SliderButtonComponent],
  templateUrl: './slider-component.html',
  styleUrl: './slider-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit, AfterContentInit {
  changeDetector = inject(ChangeDetectorRef);

  @HostBinding('style.justify-content') content = 'center';

  gameGroup = viewChildren(GameGroupComponent);

  readonly isRight = signal(true);

  readonly orientation = input<'center' | 'start' | 'end'>('center');

  readonly objects = input<SliderGameObject[]>();

  readonly maxLengthCell = input.required<number>();

  readonly map = computed(() => this.recalculateToMap());

  readonly centerIndex = signal(0);

  calculateTransform(trObj: TransformSlide): void {
    calculateTransformForSlider(
      trObj,
      this.map().length,
      this.isRight,
      this.centerIndex,
      this.gameGroup()
    );
  }
  recalculateToMap(): SliderGroup<SliderGameObject>[] {
    const map: SliderGroup<SliderGameObject>[] = [];

    const objs = this.objects();

    if (!objs) {
      return map;
    }

    const length = objs.length + 1;

    let count = 0;

    const lengthOfPart = Math.floor(length / this.maxLengthCell());

    let num = this.maxLengthCell();

    for (
      let i = this.maxLengthCell() % 2 === 0 ? 0 : 1;
      i < lengthOfPart;
      i++
    ) {
      const sliders = this.objects()!.slice(
        count,
        num >= length ? length - 1 : num
      );

      num = sliders.length * 2;

      count = sliders.length;

      map.push({ id: i, sliderObjects: sliders });
    }
    return map;
  }

  ngOnInit(): void {
    this.centerIndex.set(centerObjIndex(this.map().length));
  }
  ngAfterContentInit(): void {
    this.content = this.orientation();
  }
  log(object: object): void {
    console.log(object);
  }
}
