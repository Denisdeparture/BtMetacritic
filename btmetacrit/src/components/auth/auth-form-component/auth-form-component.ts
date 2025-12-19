import { ChangeDetectionStrategy, Component, contentChild, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form-component.html',
  styleUrl: './auth-form-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
  authForm: FormGroup = new FormGroup(null);
  authArray: Auth[]  = [];
  readonly buttonTitle = contentChild('title')
  readonly complete = output();
  addNewParam(item: Auth): void{
    this.authForm.addControl(item.name, item.formControl);
    this.authArray.push(item)
  }
  clearAll(): void{
    this.authForm = new FormGroup(null); 
  }
  submit(): void{
    this.complete.emit();
  }
  takeANormal(name: string): string{
    const result = name[0].toUpperCase() + name.slice(1); 
    return result;
  }
}
export type Auth = {
  id: number,
  type: any,
  formControl: FormControl,
  name: string
}
