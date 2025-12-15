import { ChangeDetectionStrategy, Component,  computed,  HostBinding,  input, OnInit,  } from '@angular/core';

@Component({
  selector: 'app-game-component',
  imports: [],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GameComponent implements OnInit {

  readonly title = input<string>();
  readonly isCenter = input<boolean>();
  readonly imageLink = input<string>();
  readonly imageSize = input<[string, string]>(['110', '200']);
  readonly rating = input<number>();

  readonly colorRating = computed(() => this.calculateColor())


  @HostBinding("style.margin-top") margin_top = '0px';
  @HostBinding("style.transform") transform = '';
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

  ngOnInit(): void {
    if(this.isCenter()){
      this.margin_top = '10px'
      this.transform = 'scale(1.1)';
    }
  }
}
export const RATINGS_COLORS = {
  GOOD: '#0BFF38',
  BAD: '#D8000C',
  MIDDLE: '#FFC659'
};