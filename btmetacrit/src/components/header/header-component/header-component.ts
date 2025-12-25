import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SearchBarComponent } from "../search-bar-component/search-bar-component";
import { TitleHintsComponent } from "../title-hints-component/title-hints-component";
import { Hint } from '../../../types';
import { DynamicComponentRenderer } from '../../../services/dynamic-renderer-service';
import { AuthPopUpComponent } from '../../auth/auth-pop-up-component/auth-pop-up-component';

@Component({
  selector: 'app-header-component',
  imports: [SearchBarComponent, TitleHintsComponent],
  templateUrl: './header-component.html',
  providers: [DynamicComponentRenderer<AuthPopUpComponent>],
  styleUrl: './header-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  dynamicRenderer = inject(DynamicComponentRenderer<AuthPopUpComponent>)

  wasClick = false;

  readonly allHints = input<Hint[]>();

  onClick(): void
  {
    if(this.wasClick){
      
    }
    this.dynamicRenderer.spawn(AuthPopUpComponent);

  }
}
