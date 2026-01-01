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
import { slideInL, slideInR } from '../../main/game-group-component/animations';
import {
  SliderButtonComponent,
  TransformSlide,
} from '../../main/slider-button-component/slider-button-component';
import {
  calculateTransformForSlider,
  ISLide,
} from '../../main/slider-component/helper';
import { Screenshot } from '../../../types';
import { state, style, trigger } from '@angular/animations';


@Component({
  animations: [slideInR, slideInL],
  selector: 'app-images-slider-component',
  imports: [SliderButtonComponent],
  templateUrl: './images-slider-component.html',
  styleUrl: './images-slider-component.scss',
})
export class ImagesSliderComponent implements ISLide, OnInit {
  @HostBinding('style.justify-content') content = 'center';

  isSlide = false;

  readonly isRight = signal(true);

  readonly screens = viewChild('screen');

  readonly images = input.required<Screenshot[]>();

  readonly width = input<string>('200px');

  readonly height = input<string>('200px');

  readonly orientation = input<'center' | 'start' | 'end'>('center');

  readonly centerIndex = signal(0);

  ngOnInit(): void {
    this.content = this.orientation();
    this.slide();
  }
  isActive(id: number): boolean {
    console.log('Id was ' + id);
    console.log('Id center: ' + this.centerIndex());
    return id == this.centerIndex();
  }
  calculateTransform(event: TransformSlide) {
    this.slide();
    calculateTransformForSlider(
      event,
      this.images().length,
      this.isRight,
      this.centerIndex
    );
    console.log(this.centerIndex() + 'Index now');
  }
  slide(): void {
    console.log('slide');
    this.isSlide = !this.isSlide;
  }
});
