import { ChangeDetectorRef, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { SectionStorageService } from './services/sections-service';
import { GameInfo, Section, User } from './types';
import { UserService } from './services/user-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { UserStore } from './services/stores/user-store';

export const mainResolver: ResolveFn<Section[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const storage = inject(SectionStorageService);

  const sects: Section[] = [];

  storage.getRandomSections().subscribe((list) => {
    sects.push(...list);
  });
  return sects;
};
export const searchResolver: ResolveFn<Section[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const storage = inject(SectionStorageService);

  const name = route.root.queryParams['name'];

  const sects: Section[] = [];

  if (name == undefined) {
    console.log('Name is null');
    storage.getRandomSections().subscribe((list) => {
      sects.push(...list);
    });

    return sects;
  }

  storage.getSearchSections(name).subscribe((obsr2) => {
    obsr2.subscribe((list) => {
      sects.push(...list);
    });
  });

  return sects;
};

export const userResolver: ResolveFn<User> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const userStore = inject(UserStore);

  const id = route.root.queryParams['id'];

  const user = userStore.getUser();

  return user;
};
