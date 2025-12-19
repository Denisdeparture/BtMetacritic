import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {  FormsModule,  } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AuthFormComponent} from "../auth-form-component/auth-form-component";
import { OAuth2ButtonComponent } from "../o-auth-2-button-component/o-auth-2-button-component";
@Component({
  selector: 'app-auth-pop-up-component',
  imports: [NgOptimizedImage, MatRadioModule, CommonModule, FormsModule, AuthFormComponent, OAuth2ButtonComponent],
  templateUrl: './auth-pop-up-component.html',
  styleUrl: './auth-pop-up-component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPopUpComponent {

  option = KindOfAuthOp.Login.toString();

  readonly OAuth2Buttons: OAuth2Type[] = []; // maybe with resolver like in main

  readonly condition = computed(() => this.option === KindOfAuthOp.Login.toString() ? true : false)
 
  clickOnRadioButton() : void
  {
    throw new Error('Method not implemented.');
    
  }
}
export enum KindOfAuthOp {
  Registration,
  Login
}
export type OAuth2Type = {
  provider: string,
  logoLink: string
} 
