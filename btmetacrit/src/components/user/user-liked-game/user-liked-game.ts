import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
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
  host = inject(ElementRef);

  readonly game = input.required<LikedGame>();

  readonly price = computed(() =>
    this.takePriceInDollars(this.game().price_overview)
  );

  readonly isLikes = output<[boolean, ElementRef]>();

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
  changeLike(event: boolean) {
    this.isLikes.emit([event, this.host]);
  }
}

export type LikedGame = Pick<
  GameInfo,
  'name' | 'price_overview' | 'screenshots' | 'header_image'
>;
