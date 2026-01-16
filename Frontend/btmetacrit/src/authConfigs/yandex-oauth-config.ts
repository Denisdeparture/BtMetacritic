import { AuthConfig } from 'angular-oauth2-oidc';

export const YandexOAuthConfig: AuthConfig = {
  issuer: 'https://oauth.yandex.ru/authorize',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/signin-yandex',
  clientId: '219a9a6780ca4a3d88958ace2742884c',
  showDebugInformation: true,

  customQueryParams: {
    // use it if doesnt work
  },
};
//  = "https://oauth.yandex.ru/authorize";
//https://localhost/signin-yandex
// /// Default value for <see cref="OAuthOptions.TokenEndpoint"/>.
//"https://oauth.yandex.ru/token";
// <see cref="OAuthOptions.UserInformationEndpoint"/>.
// "https://login.yandex.ru/info";
