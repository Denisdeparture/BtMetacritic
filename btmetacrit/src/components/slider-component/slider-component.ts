import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, input, linkedSignal, OnInit, Renderer2, signal, WritableSignal } from '@angular/core';
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
export class SliderComponent implements OnInit {

  changeDetector = inject(ChangeDetectorRef);

  readonly objects = input<SliderObject[]>();


  readonly maxLengthCell = input.required<number>();

  readonly centerIndex = signal(0)

  recalculateToMap(): void{
    const map = new Map<number, SliderObject[]>();
    let count = 0;
    const num = Math.floor(this.objects()!.length / this.maxLengthCell());
    for(let i = 1; i <= num; i++){
      count = this.maxLengthCell() * i;
      map.set(i, this.objects()!.slice(i, count));
    }
  }

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
  ngOnInit(): void {
    this.centerIndex.set(this.centerObjIndex());
  }
  calculateTransform(currentIndex: number): void{
  const length = this.objects()?.length;

   this.centerIndex.update((x) => {
    x = x + currentIndex;
    if(x > length!) {
      x = 0;
    }
    if(x < 0){
      x = length!;
    }
    return x;
   })
    // ci can be negative
  }
}
