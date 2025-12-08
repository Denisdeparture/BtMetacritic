import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  value = "";
  validationForm = new FormControl('', [Validators.required]);
}
