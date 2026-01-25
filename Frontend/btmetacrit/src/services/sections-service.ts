import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GameInfo, Section } from '../types';
import { HttpClient } from '@angular/common/http';
import { GameStore } from './stores/game-user-store';
import { SteamApiService } from './steam-api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SectionStorageService {
  httpClient = inject(HttpClient);

  destroy = inject(DestroyRef);

  steamApi = inject(SteamApiService);

  getSearchSections(name: string): Observable<Observable<Section[]>> {
    return this.steamApi.getGamesByName(name).pipe(
      map((list) => {
        return this.steamApi.getGamesByIds(list.map((x) => x.id)).pipe(
          takeUntilDestroyed(this.destroy),
          map((list2) => {
            const sects: Section[] = [];
            sects.push({
              id: 0,
              caption: {
                title: 'Search result',
              },
              games: list2!,
            });

            return sects;
          }),
        );
      }),
    );
  }
  getRandomSections(): Observable<Section[]> {
    return this.steamApi.takeFirstGames(5).pipe(
      map((list) => {
        const sects: Section[] = [];
        let counter = 0;
        sects.push({
          id: counter,
          caption: {
            title: 'Popular games',
          },
          games: list,
        });
        counter++;

        return sects;
      }),
    );
  }
}
