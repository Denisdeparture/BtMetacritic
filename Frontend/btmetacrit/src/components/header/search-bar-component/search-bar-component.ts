import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  effect,  ElementRef,  inject, OnChanges, Renderer2, signal, SimpleChanges, TemplateRef, viewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-search-bar-component',
  imports: [CommonModule, FormsModule,  MatInputModule,
    MatFormFieldModule, ReactiveFormsModule ],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent  {
  readonly label = viewChild<ElementRef>('searcher')

  readonly value = signal("");

  rerender = inject(Renderer2);

  validationForm = new FormControl('', [Validators.required]);
  
  constructor(){
    effect((ef) => {
      if(this.value() === ''){
        this.submitInput();
      }
    });
  }

  clickOnInput(): void{
    this.rerender.setStyle(this.label()?.nativeElement, 'opacity', 0) 
  }
  submitInput(): void{
    this.rerender.setStyle(this.label()?.nativeElement, 'opacity', 1) 
  }
}
