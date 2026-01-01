import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SliderGameObject, SliderGroup } from '../../../types';
import { GameComponent } from '../game-component/game-component';
import { animate, style, transition, trigger } from '@angular/animations';

// please connect with button click
const slideTransitionInRight = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(600px)' })),
]);
const slideTransitionLeft = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(-600px)' })),
]);

const slideInR = trigger('slideInR', [slideTransitionInRight]);
const slideInL = trigger('slideInL', [slideTransitionLeft]);

@Component({
  animations: [slideInR, slideInL],
  selector: 'app-game-group-component',
  imports: [GameComponent],
  templateUrl: './game-group-component.html',
  styleUrl: './game-group-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameGroupComponent {
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
