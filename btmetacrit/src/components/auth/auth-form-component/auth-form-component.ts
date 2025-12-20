import { ChangeDetectionStrategy, 
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject, model, output, Renderer2, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-form-component.html',
  styleUrl: './auth-form-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
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

    console.log(this.authForm);

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
