import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { ButtonLikesComponent } from '../../common/button-likes-component/button-likes-component';
import {
  TooltipComponent,
  TooltipInfo,
} from '../tooltip-component/tooltip-component';
import { GameInfo } from '../../../types';
import { calculateColor, recalcImg } from '../../common/helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { LINKS } from '../../../app/app.routes';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-game-component',
  imports: [ButtonLikesComponent, TooltipComponent, NgOptimizedImage],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  router = inject(Router);

  route = inject(ActivatedRoute);
  readonly istdisplay = signal<boolean>(false);
  readonly game = input.required<GameInfo>();
  readonly title = computed<string>(() => this.game().name);
  readonly imageSize = input<[string, string]>(['110', '200']);

  readonly colorRating = computed(() => this.calculateColor());
  @HostListener('click') click(): void {
    this.router.navigate([LINKS.GAME, this.game().steam_appid]);
  }
  @HostListener('mouseenter') tooltipShow(): void {
    this.istdisplay.set(true);
  }
  @HostListener('mouseleave') tooltipHide(): void {
    this.istdisplay.set(false);
  }
  rating(): number {
    if (this.game()) {
      return 0;
    }

    const meta = this.game().metacritic;

    console.log(meta);

    if (meta == undefined) {
      return 0;
    }

    return meta.score!;
  }
  calculateColor(): string {
    return calculateColor(this.rating());
  }
  mapToTooltip(): TooltipInfo {
    return {
      title: this.game().name,
      imagesLinks: recalcImg(
        this.game().header_image ?? '',
        this.game().screenshots ?? [],
      ),
      dateRealese: this.game().release_date?.date ?? 'Unknown',
      genres: this.game().genres,
      linkForMoreInfo: ' ', // add here link,  routes for it
      description: this.game().short_description,
    };
  }
}
