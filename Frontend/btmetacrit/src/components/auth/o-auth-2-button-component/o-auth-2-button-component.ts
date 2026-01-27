import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-o-auth-2-button-component',
  imports: [],
  templateUrl: './o-auth-2-button-component.html',
  styleUrl: './o-auth-2-button-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OAuth2ButtonComponent {
  readonly logoLink = input.required<string>();
  readonly provider = input.required<string>();
  oAuthService = inject(AuthService);

  clickOnProvider() {
    this.oAuthService.oAuthlogin(this.provider());
  }
}
