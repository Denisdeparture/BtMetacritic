import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { SectionStorageService } from './services/sections-service';
import { GameInfo, Section, User } from './types';
import { UserStorageService } from './services/user-service';

export const sectionsResolver: ResolveFn<Section[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storage = inject(SectionStorageService);

  return storage.getSections(); // Получаем данные
};
export const userDataResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storage = inject(UserStorageService);

  if (route.queryParams['id']) {
    console.log('Id was null');
  }

  return storage.getUser(route.queryParams['id']);
};
export const gameDataResolver: ResolveFn<GameInfo> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const storage = inject(SectionStorageService);

  return storage.getSilksong('Test');
};
