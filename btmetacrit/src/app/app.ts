import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../components/header-component/header-component";
import { MainPageComponent } from "../components/main-page-component/main-page-component";
import { Hint } from '../types';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MainPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class App {
    baseHints: Hint[] =  [
    {id: 0, title: 'Home', roots: new Map<string, string>([
      ["Game", "/game"],
      ["User reviews", "/userreviews"],
      ["Criric reviews", "/criticreviews"]
    ])},
    {id: 1, title: 'Category' },
    {id: 2, title: 'New'}
  ]
  protected readonly title = signal('btmetacrit');


}
