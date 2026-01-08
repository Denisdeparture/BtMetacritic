import { ChangeDetectionStrategy, Component, HostBinding, input, signal } from '@angular/core';
import { TextLengthDirective } from '../../../directives/text-length/text-length-directive';
import { show } from '../../common/animations';
@Component({
  animations: [show],
  selector: 'app-game-view-full-description-component',
  imports: [TextLengthDirective],
  templateUrl: './game-view-full-description-component.html',
  styleUrl: './game-view-full-description-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameViewFullDescriptionComponent {
  readonly height = signal<number>(200);

  readonly isOpenFull = signal<boolean>(false);
  readonly description = input.required<string>();
  private $baseheight = 200;
  changeHeight(): void{
    if(this.isOpenFull()){
      this.height.set(this.$baseheight);
    }
    else{
      this.height.set( this.description().length / 2);
    }
  }
  readMore(): void{
    this.isOpenFull.update((v) => !v);
    this.changeHeight();
  }
  readMoreWithDirective(link?: string): void{
    this.readMore()
  }
}
