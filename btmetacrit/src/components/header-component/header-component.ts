import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SearchBarComponent } from "../search-bar-component/search-bar-component";
import { TitleHintsComponent } from "../title-hints-component/title-hints-component";
import { Hint } from '../../types';

@Component({
  selector: 'app-header-component',
  imports: [SearchBarComponent, TitleHintsComponent],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  readonly allHints = input<Hint[]>();
}
