import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInfo } from '../../../types';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { recalcImg } from '../../common/helpers';
import { SliderBarComponent } from '../slider-bar-component/slider-bar-component';
import { GameViewImageGroupComponent } from '../game-view-image-group-component/game-view-image-group-component';
import { GameViewFullInfoComponent } from '../game-view-full-info-component/game-view-full-info-component';
import { CaptionComponent } from '../../main/caption-component/caption-component';
import { GameViewFullDescriptionComponent } from '../game-view-full-description-component/game-view-full-description-component';
import { HintsService } from '../../../services/views/hints-service';
import { SteamApiService } from '../../../services/steam-api-service';

@Component({
  selector: 'app-game-view-component',
  imports: [
    SliderBarComponent,
    GameViewImageGroupComponent,
    GameViewFullInfoComponent,
    CaptionComponent,
    GameViewFullDescriptionComponent,
  ],
  templateUrl: './game-view-component.html',
  styleUrl: './game-view-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent implements OnInit {
  route = inject(ActivatedRoute);

  hints = inject(HintsService);

  steamApi = inject(SteamApiService);

  params = toSignal(this.route.params);

  gameinfoAsync = this.steamApi.getGame(this.params()!['id']);

  readonly gameSignal = toSignal(this.gameinfoAsync);

  readonly game = computed(() => this.gameSignal());

  readonly images = computed(() => {
    return recalcImg(
      this.game()!.header_image ?? '',
      this.game()!.screenshots ?? [],
    );
  });

  readonly indexForImg = signal<number>(0);
  ngOnInit(): void {
    this.hints.setCurrentHints([
      { id: 0, title: 'main' },
      { id: 1, title: 'description' },
    ]);
  }
  changeImage(event: number): void {
    this.indexForImg.set(event);
  }
  getDescription(): string {
    const game = this.game();
    if (!game) {
      return '';
    }

    return game.detailed_description === undefined
      ? game.short_description!
      : game.detailed_description!;
  }
}
