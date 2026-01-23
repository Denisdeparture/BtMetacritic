import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { YandexOAuthConfig } from '../authConfigs/yandex-oauth-config';
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import {
  OAuth2Type,
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
  additionalPath = '/auth';

  constructor() {
    this.oAuthService.configure(YandexOAuthConfig);
  }
  login(info: UserLoginRequest): Observable<UserLoginResponce> {
    return this.httpClient.post<UserLoginResponce>(
      environment.apiUrl + this.additionalPath + '/sign-in',
      info,
    );
  }
  oAuthlogin(): void {
    this.oAuthService.initLoginFlow();
  }
  processOAuth(provider: string): void {
    from(this.oAuthService.loadDiscoveryDocumentAndTryLogin()).subscribe(() => {
      const claims = this.oAuthService.getIdentityClaims();

      const mail = claims['email'];
      if (!this.oAuthService.hasValidIdToken()) return undefined;

      const idToken = this.oAuthService.getIdToken();

      var req = this.httpClient.post(
        environment.apiUrl + this.additionalPath + '/oauth',
        undefined,
        {
          params: {
            idToken: idToken,
            provider: provider,
            email: mail,
          },
        },
      );

      req.subscribe();
    });
  }
  setTokens(tokens: UserLoginResponce): void {
    this.tokenStorage.setTokens(tokens);
  }
  clearTokens(): void {
    this.tokenStorage.clearTokens();
  }
  register(info: UserRegisterRequest): Observable<UserLoginResponce> {
    const path = environment.apiUrl + this.additionalPath + '/sign-up';

    return this.httpClient.post<UserLoginResponce>(path, info);
  }
  getOAuthProviders(): OAuth2Type[] {
    return [
      { logoLink: '../../../assets/img/google.png', provider: 'Google' },
      { logoLink: '../../../assets/img/discord-logo.png', provider: 'Discord' },
      { logoLink: '../../../assets/img/yandex-logo.png', provider: 'Yandex' },
    ];
  }
}
