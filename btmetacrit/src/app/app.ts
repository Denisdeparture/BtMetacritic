import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent, Hint } from "../components/header-component/header-component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class App {
    baseHints: Hint[] =  [
    {id: 0, title: 'Home', },
    {id: 1, title: 'Category' },
    {id: 2, title: 'New'}
  ]
  
  protected readonly title = signal('btmetacrit');


}
