import { AuthConfig } from 'angular-oauth2-oidc';
import { OAUTHLINKS } from '../app/app.routes';

export const YandexOAuthConfig: AuthConfig = {
  issuer: 'https://oauth.yandex.ru/authorize',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/' + OAUTHLINKS.YANDEX,
  clientId: 'c0aff30462394e45949ce679868188d8',
  showDebugInformation: true,

  customQueryParams: {},
};
