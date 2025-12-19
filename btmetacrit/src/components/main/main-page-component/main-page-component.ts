import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CaptionComponent } from "../caption-component/caption-component";
import { SliderComponent } from "../slider-component/slider-component";
import { Section, SliderObject } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-main-page-component',
  imports: [CaptionComponent, SliderComponent],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {


  route = inject(ActivatedRoute);

  sectionsAsync = this.route.data.pipe(
    map((data) => data['sections'] as Section[])
  );

  readonly sectionsSignal = toSignal(this.sectionsAsync) 

  readonly sections = computed(() => this.sectionsSignal());

  ngOnInit(): void {
    this.sectionsAsync.subscribe((d) => console.log(d));
  }
 // create a helper for this
  getSliderInfoById(idSection: number): SliderObject[]{
    const games = this.sections()![idSection].games;
    const list: SliderObject[] =  [];
    let counter = 0; 
    for(const game of games){
      list.push({
      id: counter,
      rating: game.metacritic.score,
      title: game.name,
      imageLink: game.header_image
      })
      counter++;
    }
    return list;
  }
}
