import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, 
   OnInit, signal } from '@angular/core';
import { SliderGroup, SliderObject } from '../../types';
import { GameGroupComponent } from '../game-group-component/game-group-component';

@Component({
  selector: 'app-slider-component',
  imports: [
    CommonModule,
    NgTemplateOutlet,
    GameGroupComponent,
],
  templateUrl: './slider-component.html',
  styleUrl: './slider-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {

  changeDetector = inject(ChangeDetectorRef);

  readonly objects = input<SliderObject[]>();

  readonly maxLengthCell = input.required<number>();

  readonly map = computed(() => this.recalculateToMap());

  readonly centerIndex = signal(0)

  recalculateToMap(): SliderGroup[]{
    const map: SliderGroup[] = [] 

    const length = this.objects()!.length! + 1;

    let count = 0;

    const lengthOfPart = Math.floor(length / this.maxLengthCell());

    let num = this.maxLengthCell();
    
    for(let i = this.maxLengthCell() % 2 === 0 ? 0 : 1; i < lengthOfPart; i++){

      const sliders = this.objects()!.slice(count, num >= length ? length - 1 : num);

      num = sliders.length * 2;

      count = sliders.length;

      map.push({id:i, sliderObjects: sliders});
    }
    return map;
  }
  centerObjIndex(): number{

    const length = this.map()?.length;

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
    return Math.floor(index);

  }
  ngOnInit(): void {
    this.centerIndex.set(this.centerObjIndex());
  }
  log(object: object): void{
    console.log(object);
  }
  calculateTransform(currentIndex: number): void{
   const length = this.map()?.length;
   
   this.centerIndex.update((x) => {
    x = x + currentIndex;
    if(x >= length!) {
      x = 0;
    }
    if(x < 0){
      x = length!;
    }
    return x;
   })
  }
}
