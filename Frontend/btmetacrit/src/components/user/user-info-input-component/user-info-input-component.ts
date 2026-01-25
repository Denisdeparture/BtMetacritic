import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { takeANormal } from '../../common/helpers';
import { UserService } from '../../../services/user-service';
import { TokenStore } from '../../../services/stores/token-store';
import { SimpleUserInfo } from '../../../types';

@Component({
  selector: 'app-user-info-input-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-info-input-component.html',
  styleUrl: './user-info-input-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoInputComponent {
  param: string = '';
  userService = inject(UserService);
  tokenService = inject(TokenStore);
  readonly value = model.required<string>();

  readonly baseParam = model.required<keyof SimpleUserInfo>();

  readonly type = input.required<'email' | 'text' | 'number'>();

  saveChnages(): void {
    if (this.param === null) {
      return;
    }
    console.log(this.tokenService.accessToken());
    this.userService
      .getUser(this.tokenService.accessToken())
      .subscribe((user) => {
        const newUser = user;

        const info = newUser.info!;

        info[this.baseParam()] = this.param;

        newUser.info = info;

        this.userService.updateUser(this.tokenService.accessToken(), newUser);
      });
  }
  takeANormal(str: string): string {
    return takeANormal(str);
  }
}
