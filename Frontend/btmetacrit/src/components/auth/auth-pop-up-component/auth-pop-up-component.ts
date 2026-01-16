import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  HostBinding,
  inject,
  output,
  Renderer2,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { AuthFormComponent } from '../auth-form-component/auth-form-component';
import { OAuth2ButtonComponent } from '../o-auth-2-button-component/o-auth-2-button-component';
import { show } from '../../common/animations';
import { AuthService } from '../../../services/auth-service';
import { complexPasswordValidator } from '../../../validators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { LINKS } from '../../../app/app.routes';

@Component({
  animations: [show],
  selector: 'app-auth-pop-up-component',
  imports: [
    CommonModule,
    FormsModule,
    AuthFormComponent,
    OAuth2ButtonComponent,
  ],
  templateUrl: './auth-pop-up-component.html',
  styleUrl: './auth-pop-up-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPopUpComponent implements AfterViewInit {
  rerender = inject(Renderer2);

  authService = inject(AuthService);

  destroyRef = inject(DestroyRef);

  router = inject(Router);

  authentitication = KindOfAuthOp.LOGIN.toString();

  registration = KindOfAuthOp.REGISTRATION.toString();

  readonly loginButton = viewChild<ElementRef>('login');

  readonly regButton = viewChild<ElementRef>('reg');

  readonly option = signal<string>(this.authentitication);

  readonly destroySignal = output<void>();

  readonly authForm = viewChild(AuthFormComponent);

  readonly OAuth2Buttons: OAuth2Type[] = []; // maybe with resolver like in main

  readonly condition = computed(() =>
    this.option() === KindOfAuthOp.LOGIN.toString() ? true : false
  );

  @HostBinding('style.background-color') baseColor = '';

  ngAfterViewInit(): void {
    this.initOperationForms();
  }
  initOperationForms(): void {
    const form = this.authForm()!;
    if (form.name() === this.authentitication) {
      this.createForms(form, undefined);
      this.rerender.setStyle(
        this.loginButton()?.nativeElement,
        'background-color',
        '#AA8A7D'
      );
      this.rerender.setStyle(
        this.regButton()?.nativeElement,
        'background-color',
        this.baseColor
      );
    } else {
      this.createForms(undefined, form);
      this.rerender.setStyle(
        this.regButton()?.nativeElement,
        'background-color',
        '#AA8A7D'
      );
      this.rerender.setStyle(
        this.loginButton()?.nativeElement,
        'background-color',
        this.baseColor
      );
    }
  }
  createForms(login?: AuthFormComponent, reg?: AuthFormComponent): void {
    if (login) {
      console.log('Create login');
      login.addNewParam({
        id: 0,
        name: 'email',
        formControl: new FormControl('email', [
          Validators.email,
          Validators.required,
        ]),
        type: 'text',
      });
      login.addNewParam({
        id: 1,
        name: 'password',
        formControl: new FormControl('password', [
          Validators.minLength(22),
          complexPasswordValidator(),
        ]), // 18-24 recommended
        type: 'text',
      });
    }
    if (reg) {
      reg.addNewParam({
        id: 0,
        name: 'name',
        formControl: new FormControl('name'),
        type: 'text',
      });
      reg.addNewParam({
        id: 1,
        name: 'email',
        formControl: new FormControl('email'),
        type: 'text',
      });
      reg.addNewParam({
        id: 2,
        name: 'password',
        formControl: new FormControl('password'),
        type: 'text',
      });
    }
  }
  clickOnRadioButton(event: Event): void {
    this.authForm()?.name.set(this.option());

    this.authForm()?.clearAll();

    this.initOperationForms();
  }
  closePopUp(): void {
    this.destroySignal.emit();
  }
  clickOnButton(): void {
    const form = this.authForm()!;
    const isLogin = form.name() === this.authentitication;

    const email = form.authArray().find((x) => x.name === 'email');

    const password = form.authArray().find((x) => x.name === 'password');

    if (!email || !password) return;

    if (isLogin) {
      this.authService
        .login({
          email: email.formControl.value,
          password: password.formControl.value,
        })
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((x) => {
          this.authService.setTokens(x);
          this.router.navigate([LINKS.MAIN]);
        });
    } else {
      const name = form.authArray().find((x) => x.name === 'name');
      if (!name) return;
      this.authService.register({
        email: email.formControl.value,
        password: password.formControl.value,
        name: name.formControl.value,
      });
    }
  }
}
export const KindOfAuthOp = {
  REGISTRATION: 'Registartion',
  LOGIN: 'Login',
};
export type OAuth2Type = {
  provider: string;
  logoLink: string;
};
