import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, Renderer2 } from '@angular/core';
import { SliderObject } from '../../types';
import { GameComponent } from "../game-component/game-component";

@Component({
  selector: 'app-slider-component',
  imports: [
    CommonModule,
    NgTemplateOutlet,
    GameComponent
],
  templateUrl: './slider-component.html',
  styleUrl: './slider-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent {


  readonly objects = input<SliderObject[]>();

  centerObjIndex(): number{

    const length = this.objects()?.length;

    let index = 0;
    
    if(length! % 2 === 0) {
      const num1 = length! / 2;

      const num2 = length! / 2 + 1;

      index = (num1 + num2) / 2;

      index -= 1;
    }
    else{
      index = (length! + 1) / 2;  
      index -= 1;   
    }

    return index;

  }
  calculateTransform(currentIndex: number): string{
    return 'translateX(-' + currentIndex * 100 + '%)';
  }
}
