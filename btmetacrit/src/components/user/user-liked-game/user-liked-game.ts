import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Screenshot } from '../../../types';

@Component({
  selector: 'app-user-liked-game',
  imports: [],
  templateUrl: './user-liked-game.html',
  styleUrl: './user-liked-game.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLikedGame {
  readonly game = input<LikedGame>();
  
}
export type LikedGame = {
  name: string,
  price: number,
  header_img: string,
  screenshots: Screenshot[]
}
