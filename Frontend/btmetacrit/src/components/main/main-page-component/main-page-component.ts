import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CaptionComponent } from '../caption-component/caption-component';
import { SliderComponent } from '../slider-component/slider-component';
import { Hint, Section, SliderGameObject, SliderObject } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { delay, map } from 'rxjs';
import { mapToSliderInfoById } from '../../common/helpers';

import { KindOfSpinner } from '../../common/to-do-spinner/to-do-spinner';
import { ToDoSpinnerService } from '../../../services/views/to-do-spinner-service';
import { HintsService } from '../../../services/views/hints-service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-main-page-component',
  providers: [ToDoSpinnerService, AuthService],
  standalone: true,
  imports: [CaptionComponent, SliderComponent, CommonModule],
  templateUrl: './main-page-component.html',
  styleUrl: './main-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPageComponent implements OnInit {
  spinner = inject(ToDoSpinnerService);

  hints = inject(HintsService);

  route = inject(ActivatedRoute);

  changeDetector = inject(ChangeDetectorRef);

  sectionsAsync = this.route.data.pipe(
    map((data) => data['sections'] as Section[]),
  );

  readonly sectionsSignal = toSignal(this.sectionsAsync);

  readonly sections = computed(() => this.sectionsSignal()!);

  ngOnInit(): void {
    console.log(this.sections());
    this.spinner.showSpinner('#427b8c', KindOfSpinner.Elipse);
    setTimeout(() => {
      // RxJs ver
      this.sectionsAsync.pipe(delay(200)).subscribe(() => {
        this.spinner.destroySpinner();
      });
    });
    this.createHints();
  }

  mapToSlider(id: number): SliderGameObject[] {
    return mapToSliderInfoById(id, this.sections()!);
  }
  createHints(): void {
    const hints: Hint[] = [];

    const sects = this.sections();

    let counter = 0;

    if (!sects) return;

    for (const sect of sects) {
      counter += 1;
      hints.push({ id: counter, title: sect.caption?.title! });
    }
    this.hints.setCurrentHints(hints);
  }
}
