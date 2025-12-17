import { ChangeDetectionStrategy, Component,  input, } from '@angular/core';
import { SliderGroup } from '../../types';
import { GameComponent } from "../game-component/game-component";
import {animate, style, transition, trigger } from '@angular/animations'

// please connect with button click
const slideTransitionIn = transition(':enter', [
  style({opacity: 1}),
  animate('0.6s ease-in', style({transform: 'translateX(600px)', opacity: 0}))
])
 const slideTransitionOut = transition(':enter', [
  style({opacity: 0, transform: 'translateX(-600px)' }),
  animate('0.6s ease-in', style({opacity: 1, transform: 'translateX(0px)'}))
])

const slideIn = trigger('slideIn', [slideTransitionIn])
const slideOut = trigger('slideOut', [slideTransitionOut])

@Component({
  animations: [slideIn, slideOut],
  selector: 'app-game-group-component',
  imports: [ GameComponent],
  templateUrl: './game-group-component.html',
  styleUrl: './game-group-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameGroupComponent  {

  readonly sliderGroups = input.required<SliderGroup[]>();

  readonly activeIndex = input.required<number>();

  isActive(id: number): boolean{
    return id === this.activeIndex();
  }

  log(): void{
     console.log("Active index: " + this.activeIndex());
  }
  // ngOnInit(): void {
  //   console.log(this.sliderObjects())
  // }
}
