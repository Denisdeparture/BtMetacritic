import { AuthConfig } from 'angular-oauth2-oidc';
import { OAUTHLINKS } from '../app/app.routes';

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,

  redirectUri: window.location.origin + '/' + OAUTHLINKS.GOOGLE,
  clientId:
    '753901439060-ah20k0qol4n8cq7cda5jhk950eufe9m5.apps.googleusercontent.com',
  scope: 'openid profile email',
  customQueryParams: {
    prompt: 'select_account',
  },
  showDebugInformation: true,
};
