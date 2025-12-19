import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-pop-up-component',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-pop-up-component.html',
  styleUrl: './auth-pop-up-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPopUpComponent {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  })
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })
}
