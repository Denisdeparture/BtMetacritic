import { ChangeDetectionStrategy, 
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject, model, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../../common/button-component/button-component";

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule, ButtonComponent],
  templateUrl: './auth-form-component.html',
  styleUrl: './auth-form-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthFormComponent {
  styleForButton = {
    'width': '200px',
    'height': '30px',
    'padding': '10px',
    'font-weight': '400',
  }
  authForm: FormGroup = new FormGroup([]);
  changeDetector = inject(ChangeDetectorRef);
  readonly authArray = signal<Auth[]>([]);
  readonly name = model.required<string>();
  readonly complete = output();
  addNewParam(item: Auth): void{

    const retry = this.authArray().find(x => x.id === item.id)
    if(retry) { return; }

    this.authForm.addControl(item.name, item.formControl);
    
    this.authArray.update((arr) => {
      arr.push(item);
      return arr;
    })
    this.changeDetector.detectChanges();
  }
  clearAll(): void{
    this.authArray.set([]);
    this.authForm = new FormGroup([]);
  }
  log(obj: any): void{
    console.log(obj);
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
  type: string,
  formControl: FormControl,
  name: string
}
