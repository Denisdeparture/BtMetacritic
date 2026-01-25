import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { Signal } from '@angular/core';
import { UserLoginResponce } from '../../types';
const initialState: UserLoginResponce = {
  accessToken: '',
  refreshToken: '',
};
export const TokenStore = signalStore(
  { providedIn: 'root' },
  withState<UserLoginResponce>(initialState),
  withDevtools('Tokens storage'),
  withMethods((state) => ({
    setTokens: (tokens: UserLoginResponce): void => {
      patchState(state, tokens);
    },
    clearTokens: (): void => {
      patchState(state, { accessToken: '', refreshToken: '' });
    },
    getCurrentAccessToken: (): string => {
      return state.accessToken();
    },
    getCurrentRefreshToken: (): string => {
      return state.refreshToken();
    },
  }))
);
