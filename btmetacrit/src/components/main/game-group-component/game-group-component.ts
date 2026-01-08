import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SliderGameObject, SliderGroup } from '../../../types';
import { GameComponent } from '../game-component/game-component';
import { animate, style, transition, trigger } from '@angular/animations';
import { slideInR, slideInL } from '../../common/animations';
import { ISLide } from '../slider-component/helper';

// please connect with button click

@Component({
  animations: [slideInR, slideInL],
  selector: 'app-game-group-component',
  imports: [GameComponent],
  templateUrl: './game-group-component.html',
  styleUrl: './game-group-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameGroupComponent implements ISLide {
  isSlide = false;

  readonly sliderGroups = input.required<SliderGroup<SliderGameObject>[]>();

  readonly isRightSlide = input.required<boolean>();

  readonly activeIndex = input.required<number>();

  isActive(id: number): boolean {
    return id === this.activeIndex();
  }

  slide(): void {
    this.isSlide = !this.isSlide;
  }

  log(): void {
    console.log('Active index: ' + this.activeIndex());
  }
}
