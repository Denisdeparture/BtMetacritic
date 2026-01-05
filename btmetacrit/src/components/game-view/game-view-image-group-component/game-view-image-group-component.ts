import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  signal,
} from '@angular/core';
import { Screenshot } from '../../../types';

@Component({
  selector: 'app-game-view-image-group-component',
  imports: [],
  templateUrl: './game-view-image-group-component.html',
  styleUrl: './game-view-image-group-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameViewImageGroupComponent {
  readonly images = input.required<Screenshot[]>();
  readonly shiftThreshold = input<number>();
  readonly centerIndex = model.required<number>();
}
export type ScreenshotGroup = {
  id: number;
  screens: Screenshot[];
};
