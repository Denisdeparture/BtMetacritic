import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LINKS } from '../../../app/app.routes';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-provider-callback-component',
  imports: [CommonModule],
  templateUrl: './provider-callback-component.html',
  styleUrl: './provider-callback-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderCallbackComponent implements OnInit {
  oAuthService = inject(AuthService);

  router = inject(Router);

  route = inject(ActivatedRoute);

  providerAsync = this.route.data.pipe(
    map((data) => data['provider'] as string),
  );
  readonly provider = toSignal(this.providerAsync);

  async ngOnInit() {
    console.log(this.provider());
    const result = await this.oAuthService.processOAuth(this.provider()!);

    if (result) {
      result.subscribe((tokens: any) => {
        if (tokens != undefined) {
          this.oAuthService.setTokens(tokens);
          this.router.navigate([LINKS.MAIN]);
        }
      });
    }
  }
}
