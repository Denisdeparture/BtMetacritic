import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SliderButtonComponent,
  TransformSlide,
} from '../../main/slider-button-component/slider-button-component';

@Component({
  selector: 'app-slider-bar-component',
  imports: [FormsModule, SliderButtonComponent],
  templateUrl: './slider-bar-component.html',
  styleUrl: './slider-bar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderBarComponent {
  nowValue = 0;

  readonly length = input.required<number>();

  readonly multiplayer = input<number>(10);

  readonly nowValueEmitter = output<number>();

  changeNowValue(): void {
    this.nowValueEmitter.emit(Math.floor(this.nowValue / this.multiplayer()));
  }
  calculateTransform(event: TransformSlide) {
    this.nowValue =
      Math.floor(this.nowValue) + event.offset * this.multiplayer();
    if (this.nowValue < 0) {
      this.nowValue = this.length() * this.multiplayer();
    }
    this.changeNowValue();
  }
}
