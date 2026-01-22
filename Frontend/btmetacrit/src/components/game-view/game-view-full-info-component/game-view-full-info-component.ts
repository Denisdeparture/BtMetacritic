import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  OnInit,
  viewChild,
} from '@angular/core';
import { GameInfo } from '../../../types';
import { calculateColor } from '../../common/helpers';
import { SeeAllListDirective } from '../../../directives/see-all/see-all-list-directive';

@Component({
  selector: 'app-game-view-full-info-component',
  imports: [SeeAllListDirective],
  templateUrl: './game-view-full-info-component.html',
  styleUrl: './game-view-full-info-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewFullInfoComponent {
  readonly info = input.required<GameInfo>();

  readonly userMarks = input<number>();

  readonly title = computed(() => this.info().name!);

  readonly mainImg = computed(() => this.info().header_image ?? '');

  readonly platformsSupported = computed(() => this.info().platforms);

  readonly publisher = computed(() => this.info().publishers ?? []);

  readonly dateRealese = computed(() =>
    this.info().release_date?.coming_soon
      ? 'Coming soon'
      : this.info().release_date!.date,
  );

  readonly metacritic = computed(() => this.info().metacritic);

  readonly developers = computed(() => this.info().developers);

  readonly criticScore = computed(() =>
    this.metacritic() == undefined ? 0 : this.metacritic()?.score,
  );

  readonly score = computed(() => this.bestScore()); // i do this for best user experience

  bestScore(): number {
    const userMarks = this.userMarks();
    if (!userMarks) {
      return this.criticScore() ?? 0;
    }
    return userMarks > (this.criticScore() ?? 0)
      ? userMarks
      : (this.criticScore() ?? 0);
  }
  calcRating(rating: number): string {
    return calculateColor(rating);
  }
}
