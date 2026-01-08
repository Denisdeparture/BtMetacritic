import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { Screenshot } from '../../../types';
import { develop } from '../../common/animations';

@Component({
  animations: [develop],
  selector: 'app-game-view-image-group-component',
  imports: [],
  templateUrl: './game-view-image-group-component.html',
  styleUrl: './game-view-image-group-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewImageGroupComponent {
  readonly images = input.required<Screenshot[]>();
  readonly width = input<number>(200);
  readonly widthForContainerImg = input<number>(1000);
  readonly height = input<number>(100);
  readonly index = model.required<number>();

  clickImg(id: number): void{
    this.index.set(id);
  }
}
