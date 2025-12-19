import { ChangeDetectionStrategy, Component,  computed,   input,   } from '@angular/core';

@Component({
  selector: 'app-game-component',
  imports: [],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameComponent  {

  readonly title = input<string>();
  readonly imageLink = input<string>();
  readonly imageSize = input<[string, string]>(['110', '200']);
  readonly rating = input<number>();

  readonly colorRating = computed(() => this.calculateColor())
 
  calculateColor(): string {
    let color = "ffffff";
    if(this.rating()! < 39){
      color = RATINGS_COLORS.BAD;
    }
    else if(this.rating()! > 39 && this.rating()! < 80){
      color = RATINGS_COLORS.MIDDLE;
    }
    else if(this.rating()! > 80){
      color = RATINGS_COLORS.GOOD;
    }
    return color;
  }
}
export const RATINGS_COLORS = {
  GOOD: '#0BFF38',
  BAD: '#D8000C',
  MIDDLE: '#FFC659'
};