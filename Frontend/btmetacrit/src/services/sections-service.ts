import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { GameInfo, Section } from '../types';
import { HttpClient } from '@angular/common/http';
import { GameStore } from './stores/game-user-store';
import { SteamApiService } from './steam-api-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class SectionStorageService {
  private storage = new BehaviorSubject<Section[]>([]);

  private strs = [
    'Section test',
    'Section must liked',
    'Section must viewed',
    'Section games',
    'Section for pc',
  ];

  httpClient = inject(HttpClient);

  destroy = inject(DestroyRef);

  steamApi = inject(SteamApiService);

  takeUp(sections: Section[]): void {
    this.storage.next(sections);
  }
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
  getRandomSections(): Section[] {
    this.steamApi.takeFirstGames(5).subscribe((list) => {
      let counter = 0;
      for (const sect of this.strs) {
        this.addSection({
          id: counter,
          caption: {
            title: sect,
          },
          games: list,
        });
        counter += 1;
      }
    });
    return this.storage.value;
  }

  addSection(sect: Section): void {
    const sections = this.storage.getValue();

    sections.push(sect);

    this.takeUp(sections);
  }
}
