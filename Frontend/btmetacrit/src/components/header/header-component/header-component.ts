import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  OnChanges,
  OnInit,
  SimpleChanges,
  viewChild,
} from '@angular/core';
import { SearchBarComponent } from '../search-bar-component/search-bar-component';
import { TitleHintsComponent } from '../title-hints-component/title-hints-component';
import { Hint } from '../../../types';
import { DynamicComponentRenderer } from '../../../services/views/dynamic-renderer-service';
import { AuthPopUpComponent } from '../../auth/auth-pop-up-component/auth-pop-up-component';
import { HintsService } from '../../../services/views/hints-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TokenStore } from '../../../services/stores/token-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [SearchBarComponent, TitleHintsComponent],
  templateUrl: './header-component.html',
  providers: [DynamicComponentRenderer<AuthPopUpComponent>],
  styleUrl: './header-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  authPopUp? = new AuthPopUpComponent();
  router = inject(Router);
  authStorage = inject(TokenStore);
  hintService = inject(HintsService);

  dynamicRenderer: DynamicComponentRenderer<AuthPopUpComponent> = inject(
    DynamicComponentRenderer<AuthPopUpComponent>
  );

  wasClick = false;

  readonly allHints = toSignal(this.hintService.getCurrentHints());

  onClick(): void {
    const token = this.authStorage.getCurrentAccessToken();
    // depend user service and give some info
    if (!token) {
      this.router.navigate();
    }

    if (this.wasClick) {
      return;
    }
    this.dynamicRenderer.spawn(AuthPopUpComponent);
    this.wasClick = true;
    this.authPopUp = this.dynamicRenderer.component?.instance;
    this.authPopUp?.destroySignal.subscribe(() => this.close());
  }
  close(): void {
    this.dynamicRenderer.destroyComponent();
    this.wasClick = false;
  }
}
