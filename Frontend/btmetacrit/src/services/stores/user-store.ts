import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { Signal } from '@angular/core';

const initialState: User = {
  id: 0,
};
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<User>(initialState),
  withDevtools('Users Storage'),
  withMethods((state) => ({
    addUser: (user: User): void => {
      patchState(state, user);
    },
    deleteUser: (id: number): void => {
      patchState(state, initialState);
    },
    getUserId: (): number => {
      return state.id();
    },
    updateUser: (newValue: User): void => {
      patchState(state, newValue);
    },
  })),
);
