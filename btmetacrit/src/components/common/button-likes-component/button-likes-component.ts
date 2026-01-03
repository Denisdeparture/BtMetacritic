import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-button-likes-component',
  imports: [CommonModule],
  templateUrl: './button-likes-component.html',
  styleUrl: './button-likes-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonLikesComponent {
  likesStyle = 'likes';
  notlikeStyle = 'dont-likes';
  readonly isLikes = model<boolean>(false);
  readonly likeChange = output<boolean>();
  clickOnButton(): void {
    console.log('Was click');
    this.isLikes.update((x) => !x);
    this.likeChange.emit(this.isLikes());
  }
}
