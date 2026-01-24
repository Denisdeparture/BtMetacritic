import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { TokenStore } from '../../../services/stores/token-store';
import { Router } from '@angular/router';
import { LINKS } from '../../../app/app.routes';

@Component({
  selector: 'app-user-info-component',
  imports: [],
  templateUrl: './user-info-component.html',
  styleUrl: './user-info-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  readonly fullName = input.required<string>();
  readonly mail = input.required<string>();
  readonly imgPath = input<string>();
  authService = inject(AuthService);
  router = inject(Router);
  tokenService = inject(TokenStore);
  close(): void {
    this.authService.logout(
      this.tokenService.getCurrentRefreshToken(),
      this.tokenService.getCurrentAccessToken(),
    );
    this.router.navigate([LINKS.MAIN]);
  }
}
