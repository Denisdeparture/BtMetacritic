import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  readonly style = computed(() =>
    this.isLikes() ? this.likesStyle : this.notlikeStyle
  );
  readonly isLikes = signal<boolean>(false);
  clickOnButton(): void {
    this.isLikes.update((x) => !x);
  }
}
