import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { SliderGroup, SliderObject } from '../../types';
import { GameComponent } from "../game-component/game-component";

@Component({
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
    return id == this.activeIndex();
  }

  log(): void{
     console.log("Active index: " + this.activeIndex());
  }
  // ngOnInit(): void {
  //   console.log(this.sliderObjects())
  // }
}
