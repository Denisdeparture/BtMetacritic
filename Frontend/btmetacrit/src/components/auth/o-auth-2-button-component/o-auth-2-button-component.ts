import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-o-auth-2-button-component',
  imports: [NgOptimizedImage],
  templateUrl: './o-auth-2-button-component.html',
  styleUrl: './o-auth-2-button-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OAuth2ButtonComponent {
  readonly logoLink = input.required<string>(); // link in asset or web
  readonly provider = input.required<string>(); // check
}
