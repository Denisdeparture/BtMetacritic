import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { GameInfo, Price, Screenshot } from '../../../types';
import { ImagesSliderComponent } from '../images-slider-component/images-slider-component';
import { ButtonLikesComponent } from '../../common/button-likes-component/button-likes-component';

@Component({
  selector: 'app-user-liked-game',
  imports: [ImagesSliderComponent, ButtonLikesComponent],
  templateUrl: './user-liked-game.html',
  styleUrl: './user-liked-game.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLikedGame {
  readonly game = input.required<LikedGame>();

  readonly price = computed(() =>
    this.takePriceInDollars(this.game().price_overview)
  );
  recalculateImg(): Screenshot[] {
    const array: Screenshot[] = [];
    array.push({
      id: 0,
      path_thumbnail: '',
      path_full: this.game()?.header_image,
    });
    let counterId = 1; // one el had
    for (const item of this.game()?.screenshots) {
      item.id = counterId;
      array.push(item);
      counterId++;
    }
    return array;
  }
  takePriceInDollars(prices: Price[]): string | undefined {
    return prices.find((x) => x.final_formatted.includes('$'))?.final_formatted;
  }
}

export type LikedGame = Pick<
  GameInfo,
  'name' | 'price_overview' | 'screenshots' | 'header_image'
>;
