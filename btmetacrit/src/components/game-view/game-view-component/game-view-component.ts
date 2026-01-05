import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInfo } from '../../../types';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { recalcImg } from '../../common/helpers';
import { SliderBarComponent } from '../slider-bar-component/slider-bar-component';

@Component({
  selector: 'app-game-view-component',
  imports: [SliderBarComponent],
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

  changeImage(event: number): void {
    console.log('Now value in slide bar change on: ' + event);
  }
}
