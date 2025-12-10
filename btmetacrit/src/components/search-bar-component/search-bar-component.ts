import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-search-bar-component',
  imports: [CommonModule, FormsModule,  MatInputModule,
    MatFormFieldModule, ReactiveFormsModule ],
  templateUrl: './search-bar-component.html',
  styleUrl: './search-bar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  host = inject(ElementRef);
  rerender = inject(Renderer2);
  value = "";
  validationForm = new FormControl('', [Validators.required]);
  @HostListener("input") clickOnInput(): void{
    // set opecity 0 on element
     this.host.nativeElement;
  }
}
