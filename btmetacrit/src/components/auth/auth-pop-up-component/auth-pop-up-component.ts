import { CommonModule } from '@angular/common';
import {  AfterViewInit, ChangeDetectionStrategy, 
  Component, computed, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostBinding, inject,
   Renderer2, signal, viewChild} from '@angular/core';
import {  FormControl, FormsModule,  } from '@angular/forms';
import {  MatRadioModule } from '@angular/material/radio';
import { AuthFormComponent} from "../auth-form-component/auth-form-component";
import { OAuth2ButtonComponent } from "../o-auth-2-button-component/o-auth-2-button-component";
import { animate, style, transition, trigger } from '@angular/animations';
import { transform } from 'typescript';

const showAnimate = transition(':enter', [
  style({opacity: 0, transform: 'translateY(-20px)'}),
  animate('1s ease-in', style({transform: 'translateY(0px)', opacity: 1}))
])
const show = trigger('show', [showAnimate])
@Component({
  animations: [show],
  selector: 'app-auth-pop-up-component',
  imports: [MatRadioModule, CommonModule, FormsModule, AuthFormComponent, OAuth2ButtonComponent],
  templateUrl: './auth-pop-up-component.html',
  styleUrl: './auth-pop-up-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPopUpComponent implements AfterViewInit{

  rerender = inject(Renderer2);

  authentitication = KindOfAuthOp.LOGIN.toString();

  registration = KindOfAuthOp.REGISTRATION.toString();

  readonly loginButton = viewChild<ElementRef>('login');

  readonly regButton = viewChild<ElementRef>('reg');

  readonly option = signal<string>(this.authentitication);

  readonly authForm = viewChild(AuthFormComponent);

  readonly OAuth2Buttons: OAuth2Type[] = []; // maybe with resolver like in main

  readonly condition = computed(() => this.option() === KindOfAuthOp.LOGIN.toString() ? true : false)

  @HostBinding('style.background-color') baseColor = '';

  ngAfterViewInit(): void 
  {
    this.initOperationForms();
  }
  initOperationForms() : void {
    const form = this.authForm()!; 
    if(form.name() === this.authentitication){
      this.createForms(form, undefined);
      this.rerender.setStyle(this.loginButton()?.nativeElement, 'background-color','#AA8A7D');
      this.rerender.setStyle(this.regButton()?.nativeElement, 'background-color',this.baseColor);
    }
    else{
      this.createForms(undefined, form);
      this.rerender.setStyle(this.regButton()?.nativeElement, 'background-color','#AA8A7D');
      this.rerender.setStyle(this.loginButton()?.nativeElement, 'background-color',this.baseColor);
    }
  }
  createForms(login?: AuthFormComponent,reg?: AuthFormComponent): void 
  {
  if(login){
    console.log("Create login")
    login.addNewParam({
      id: 0,
      name: "email",
      formControl: new FormControl(),
      type: 'text',
    })
    login.addNewParam({
      id: 1,
      name: "password",
      formControl: new FormControl(),
      type: 'text',
    })
  }
  if(reg){
    reg.addNewParam({
      id: 0,
      name: "name",
      formControl: new FormControl(),
      type: 'text',
    })
    reg.addNewParam({
      id: 1,
      name: "email",
      formControl: new FormControl(),
      type: 'text',
    })
    reg.addNewParam({
      id: 2,
      name: "password",
      formControl: new FormControl(),
      type: 'text',
    })
  }
  }
  clickOnRadioButton(event: Event) : void
  {
    this.authForm()?.name.set(this.option());

    this.authForm()?.clearAll();

    this.initOperationForms();
  }
}
export const KindOfAuthOp = {
  REGISTRATION: "Registartion",
  LOGIN: "Login"
}
export type OAuth2Type = {
  provider: string,
  logoLink: string
} 
