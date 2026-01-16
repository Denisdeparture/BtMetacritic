import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { YandexOAuthConfig } from '../authConfigs/yandex-oauth-config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import {
  UserLoginRequest,
  UserLoginResponce,
  UserRegisterRequest,
} from '../types';
import { TokenStore } from './stores/token-store';
@Injectable({ providedIn: 'root' })
export class AuthService {
  oAuthService = inject(OAuthService);
  httpClient = inject(HttpClient);
  tokenStorage = inject(TokenStore);
  constructor() {
    this.oAuthService.configure(YandexOAuthConfig);
  }
  login(info: UserLoginRequest): Observable<UserLoginResponce> {
    return this.httpClient.post<UserLoginResponce>(
      environment.apiUrl + '/sign-in',
      info
    );
  }
  setTokens(tokens: UserLoginResponce): void {
    this.tokenStorage.setTokens(tokens);
  }
  clearTokens(): void {
    this.tokenStorage.clearTokens();
  }
  register(info: UserRegisterRequest): Observable<any> {
    return this.httpClient.post<any>(environment.apiUrl + '/sign-up', info);
  }
}
