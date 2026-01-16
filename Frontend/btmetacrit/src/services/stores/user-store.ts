import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { Signal } from '@angular/core';

const initialState: User[] = [];
export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<User[]>(initialState),
  withEntities<User>(),
  withDevtools('Users Storage'),
  withMethods((state) => ({
    addUser: (task: User): void => {
      patchState(state, addEntity(task));
    },
    deleteUser: (id: number): void => {
      patchState(state, removeEntity(id));
    },
    getUserById: (id: number): User | undefined => {
      return state.entities().find((x) => x.id == id);
    },
    getUserByName: (name: string): User | undefined => {
      return state
        .entities()
        .find((x) => x.info.firstname + x.info.lastname === name);
    },
    getUsers: (): Signal<User[]> => {
      return state.entities;
    },
    updateUser: (id: number, newValue: User): void => {
      id -= 1;
      patchState(state, removeEntity(id), addEntity(newValue));
    },
  }))
);
