import { inject } from '@angular/core';
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

export const mainResolver: ResolveFn<Section[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const storage = inject(SectionStorageService);

  const sections = storage.getRandomSections();

  return sections;
};
export const searchResolver: ResolveFn<Section[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const storage = inject(SectionStorageService);

  const name = route.root.queryParams['name'];

  if (name == undefined) {
    console.log('Name is null');

    return storage.getRandomSections();
  }

  const sects: Section[] = [];

  storage.getSearchSections(name).subscribe((obsr2) => {
    obsr2.subscribe((list) => {
      sects.push(...list);
    });
  });

  console.log(sects);

  return sects;
};
