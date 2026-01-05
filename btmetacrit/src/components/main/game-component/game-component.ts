import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  input,
  signal,
} from '@angular/core';
import { ButtonLikesComponent } from '../../common/button-likes-component/button-likes-component';
import {
  TooltipComponent,
  TooltipInfo,
} from '../tooltip-component/tooltip-component';
import { GameInfo } from '../../../types';
import { recalcImg } from '../../common/helpers';

@Component({
  selector: 'app-game-component',
  imports: [ButtonLikesComponent, TooltipComponent],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  readonly istdisplay = signal<boolean>(false);
  readonly game = input.required<GameInfo>();
  readonly title = computed<string>(() => this.game().name);
  readonly imageLink = computed<string>(() => this.game().header_image);
  readonly imageSize = input<[string, string]>(['110', '200']);
  readonly rating = computed<number>(() => this.game().metacritic.score);

  readonly colorRating = computed(() => this.calculateColor());
  @HostListener('mouseenter') tooltipShow(): void {
    this.istdisplay.set(true);
  }
  @HostListener('mouseleave') tooltipHide(): void {
    this.istdisplay.set(false);
  }

  calculateColor(): string {
    let color = 'ffffff';
    if (this.rating()! < 39) {
      color = RATINGS_COLORS.BAD;
    } else if (this.rating()! > 39 && this.rating()! < 80) {
      color = RATINGS_COLORS.MIDDLE;
    } else if (this.rating()! > 80) {
      color = RATINGS_COLORS.GOOD;
    }
    return color;
  }
  mapToTooltip(): TooltipInfo {
    return {
      title: this.game().name,
      imagesLinks: recalcImg(this.game().header_image, this.game().screenshots),
      dateRealese: new Date(this.game().release_date.date),
      genres: this.game().genres,
      linkForMoreInfo: ' ', // add here link,  routes for it
      description: this.game().short_description,
    };
  }
}
export const RATINGS_COLORS = {
  GOOD: '#0BFF38',
  BAD: '#D8000C',
  MIDDLE: '#FFC659',
};
