import {
  getState,
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import { User } from '../../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

const initialState: User = {
  id: 0,
  info: undefined,
  imgPath: '',
};
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<User>(initialState),
  withDevtools('Users Storage'),
  withMethods((state) => ({
    addUser: (user: User): void => {
      patchState(state, user);
    },
    deleteUser: (): void => {
      patchState(state, initialState);
    },
    getUser: (): User => {
      return getState(state);
    },
    updateUser: (newValue: User): void => {
      patchState(state, newValue);
    },
  })),
);
