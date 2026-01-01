import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { CaptionComponent } from "../caption-component/caption-component";
import { SliderComponent } from "../slider-component/slider-component";
import { Section, SliderObject } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';
import { mapToSliderInfoById } from '../../common/helpers';
import { ToDoSpinnerService } from '../../../services/to-do-spinner-service';
import { KindOfSpinner } from '../../common/to-do-spinner/to-do-spinner';

@Component({
  selector: 'app-main-page-component',
  providers: [ToDoSpinnerService],
  imports: [CaptionComponent, SliderComponent],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  spinner = inject(ToDoSpinnerService);

  route = inject(ActivatedRoute);

  sectionsAsync = this.route.data.pipe(
    map((data) => data['sections'] as Section[])
  );

  readonly sectionsSignal = toSignal(this.sectionsAsync) 

  readonly sections = computed(() => this.sectionsSignal());

  ngOnInit(): void {
    this.sectionsAsync.subscribe((d) => console.log(d));
    this.spinner.showSpinner('#427b8c', KindOfSpinner.Elipse);
        setTimeout(() => {
        // RxJs ver
        this.sectionsAsync.pipe(
          delay(200),
        ).subscribe(() => {
          this.spinner.destroySpinner();
        });
    });
  }
  
  mapToSlider(id: number): SliderObject[]{
    return mapToSliderInfoById(id, this.sections()!)
  }
}

