import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { GameInfo, Price, Screenshot } from '../../../types';
import { ImagesSliderComponent } from '../images-slider-component/images-slider-component';

@Component({
  selector: 'app-user-liked-game',
  imports: [ImagesSliderComponent],
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
    for (const item of this.game()!.screenshots) {
      item.id += 1;
      array.push(item);
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
