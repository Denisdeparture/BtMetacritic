import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInfo } from '../../../types';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { recalcImg } from '../../common/helpers';
import { SliderBarComponent } from '../slider-bar-component/slider-bar-component';
import { GameViewImageGroupComponent } from '../game-view-image-group-component/game-view-image-group-component';
import { GameViewFullInfoComponent } from "../game-view-full-info-component/game-view-full-info-component";

@Component({
  selector: 'app-game-view-component',
  imports: [SliderBarComponent, GameViewImageGroupComponent, GameViewFullInfoComponent],
  templateUrl: './game-view-component.html',
  styleUrl: './game-view-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewComponent {
  route = inject(ActivatedRoute);

  gameinfoAsync = this.route.data.pipe(map((data) => data['game'] as GameInfo));

  readonly gameSignal = toSignal(this.gameinfoAsync);

  readonly game = computed(() => this.gameSignal());

  readonly images = computed(() => {
    return recalcImg(this.game()!.header_image, this.game()!.screenshots);
  });

  readonly indexForImg = signal<number>(0);

  changeImage(event: number): void {
    this.indexForImg.set(event);
  }
}
