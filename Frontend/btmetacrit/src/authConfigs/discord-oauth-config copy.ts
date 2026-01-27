import { AuthConfig } from 'angular-oauth2-oidc';
import { OAUTHLINKS } from '../app/app.routes';

export const discordOAuthConfig: AuthConfig = {
  issuer: 'https://discord.com/api/oauth2/authorize',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin + '/' + OAUTHLINKS.DISCORD,
  clientId: '1465261942414249985',
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
