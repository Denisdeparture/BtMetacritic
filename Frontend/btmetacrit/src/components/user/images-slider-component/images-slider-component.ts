import {
  AfterContentInit,
  Component,
  contentChild,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnInit,
  Renderer2,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import {
  SliderButtonComponent,
  TransformSlide,
} from '../../main/slider-button-component/slider-button-component';
import {
  calculateTransformForSlider,
  ISLide,
} from '../../main/slider-component/helper';
import { Screenshot } from '../../../types';

@Component({
  selector: 'app-images-slider-component',
  imports: [SliderButtonComponent],
  templateUrl: './images-slider-component.html',
  styleUrl: './images-slider-component.scss',
})
export class ImagesSliderComponent implements ISLide, OnInit {
  @HostBinding('style.justify-content') content = 'center';

  isSlide = false;

  readonly isRight = signal(true);

  @HostBinding('style.width.px') widthHost = 0;
  @HostBinding('style.height.px') heightHost = 0;

  readonly screens = viewChild('screen');

  readonly images = input.required<Screenshot[]>();

  readonly width = input<number>(200);

  readonly height = input<number>(100);

  readonly orientation = input<'center' | 'start' | 'end'>('center');

  readonly centerIndex = signal(0);

  ngOnInit(): void {
    console.log(this.images());
    this.widthHost = this.width() + 150;
    this.heightHost = this.height();
    this.content = this.orientation();
  }
  isActive(id: number): boolean {
    console.log('Active now: ' + id);
    console.log(id == this.centerIndex());
    return id == this.centerIndex();
  }
  calculateTransform(event: TransformSlide) {
    console.log('Before: ' + this.centerIndex());
    calculateTransformForSlider(
      event,
      this.images().length,
      this.isRight,
      this.centerIndex
    );
    console.log('Index now: ' + this.centerIndex());
    this.slide();
  }
  slide(): void {
    console.log('slide');
    this.isSlide = !this.isSlide;
  }
}
