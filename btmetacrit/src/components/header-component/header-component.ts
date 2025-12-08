import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SearchBarComponent } from "../search-bar-component/search-bar-component";
import { TitleHintsComponent } from "../title-hints-component/title-hints-component";

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
export type Hint = {
  id: number,

  title: string,

  roots?: Map<string, string>// 0 - title , 1 -root
}