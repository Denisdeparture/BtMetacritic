import { inject, Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { YandexOAuthConfig } from '../authConfigs/yandex-oauth-config';
import { from, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import {
  OAuth2Type,
  UserLoginRequest,
  UserLoginResponce,
  UserRegisterRequest,
} from '../types';
import { TokenStore } from './stores/token-store';
import { googleAuthConfig } from '../authConfigs/google-auth-config';
import { discordOAuthConfig } from '../authConfigs/discord-oauth-config copy';
import { providerNames } from '../app/app.routes';
@Injectable({ providedIn: 'root' })
export class AuthService {
  oAuthService = inject(OAuthService);
  httpClient = inject(HttpClient);
  tokenStorage = inject(TokenStore);
  additionalPath = '/auth';

  login(info: UserLoginRequest): Observable<UserLoginResponce> {
    return this.httpClient.post<UserLoginResponce>(
      environment.apiUrl + this.additionalPath + '/sign-in',
      info,
    );
  }
  logout(refreshToken: string, token: string, provider?: string) {
    this.httpClient
      .delete<UserLoginResponce>(
        environment.apiUrl + this.additionalPath + '/unsign-in',
        {
          params: {
            token: refreshToken,
          },
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
      .subscribe((x) => {
        this.tokenStorage.clearTokens();
        if (provider != undefined) {
          for (const prov of this.getOAuthProviders())
            if (provider == prov.provider) {
              this.oAuthService.logoutUrl = prov.logoutLink;
              this.oAuthService.logOut(true);
            }
        }
      });
  }
  oAuthlogin(provider: string): void {
    for (const prov of this.getOAuthProviders()) {
      if (provider == prov.provider) {
        if (!prov.config) {
          throw new Error();
        }
        console.log(prov.config.redirectUri);
        this.oAuthService.configure(prov.config);
      }
    }
    this.oAuthService.initLoginFlow();
  }
  processOAuth(provider: string): Observable<object | undefined> {
    return from(this.oAuthService.loadDiscoveryDocumentAndTryLogin()).pipe(
      map(() => {
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

        return req;
      }),
    );
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
      {
        logoLink: '../../../assets/img/google.png',
        provider: providerNames.GOOGLE,
        logoutLink: 'https://accounts.google.com/logout',
        config: googleAuthConfig,
      },
      {
        logoLink: '../../../assets/img/discord-logo.png',
        provider: providerNames.DISCORD,
        logoutLink: 'https://discord.com/api/oauth2/token/revoke',
        config: discordOAuthConfig,
      },
      {
        logoLink: '../../../assets/img/yandex-logo.png',
        provider: providerNames.YANDEX,
        logoutLink: 'https://oauth.yandex.ru/revoke_token',
        config: YandexOAuthConfig,
      },
    ];
  }
}
