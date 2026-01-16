import { GameInfo } from '../../types';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { Signal } from '@angular/core';
const initialState: GameInfo[] = [];
export const GameStore = signalStore(
  { providedIn: 'root' },
  withState<GameInfo[]>(initialState),
  withEntities<GameInfo>(),
  withDevtools('Games Storage'),
  withMethods((state) => ({
    addUser: (task: GameInfo): void => {
      patchState(state, addEntity(task));
    },
    deleteUser: (id: number): void => {
      patchState(state, removeEntity(id));
    },
    getGame: (id: number): GameInfo | undefined => {
      return state.entities().find((x) => x.id == id);
    },
    getGames: (): Signal<GameInfo[]> => {
      return state.entities;
    },
    updateUser: (id: number, newValue: GameInfo): void => {
      id -= 1;
      patchState(state, removeEntity(id), addEntity(newValue));
    },
  }))
);
