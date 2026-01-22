import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnChanges,
  Renderer2,
  signal,
  SimpleChanges,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { SteamApiService } from '../../../services/steam-api-service';
import { NavigationExtras, Router } from '@angular/router';
import { LINKS } from '../../../app/app.routes';
import { ToDoSpinnerService } from '../../../services/views/to-do-spinner-service';
import { KindOfSpinner } from '../../common/to-do-spinner/to-do-spinner';
@Component({
  selector: 'app-search-bar-component',
  providers: [ToDoSpinnerService],
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  steamApi = inject(SteamApiService);

  route = inject(Router);

  readonly label = viewChild<ElementRef>('searcher');

  value = '';

  rerender = inject(Renderer2);

  validationForm = new FormControl('', [Validators.required]);

  @HostListener('document:keydown.enter', ['$event'])
  enter(event: any): void {
    this.submitInput();
  }
  clickOnInput(): void {
    this.rerender.setStyle(this.label()?.nativeElement, 'opacity', 0);
  }
  submitInput(): void {
    this.rerender.setStyle(this.label()?.nativeElement, 'opacity', 1);

    const nav: NavigationExtras = {
      queryParams: {
        name: this.value,
      },
    };
    this.route.navigate([LINKS.SEARCH], nav);
  }
}
