import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameInfo, Section } from '../types';
import { HttpClient } from '@angular/common/http';
import { GameStore } from './stores/game-store';

@Injectable({ providedIn: 'root' })
export class SectionStorageService {
  private storage = new BehaviorSubject<Section[]>([]);

  httpClient = inject(HttpClient);

  gameStore = inject(GameStore);

  constructor() {
    for (let i = 0; i < 2; i += 1) {
      this.addSection({
        id: i,
        caption: {
          title: 'Test',
          link: './test',
        },
        games: [],
      });
    }
  }
  takeUp(sections: Section[]): void {
    this.storage.next(sections);
  }

  getSections(): Observable<Section[]> {
    return this.storage.asObservable();
  }

  addSection(sect: Section): void {
    const sections = this.storage.getValue();

    sections.push(sect);

    this.takeUp(sections);
  }
}
