import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameStore } from './stores/game-store';
import { GameInfo } from '../types';
import { environment } from '../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SteamApiService {
  httpClient = inject(HttpClient);

  storage = inject(GameStore);

  addtionalPath = '/game';

  takeFirstGames(count: number): Observable<GameInfo[]> {
    return this.httpClient.get<GameInfo[]>(
      environment.apiUrl + this.addtionalPath + '/takefirst',
      {
        params: {
          count: count,
        },
      }
    );
  }
  getGame(id: number): Observable<GameInfo> {
    return this.httpClient.get<GameInfo>(
      environment.apiUrl + this.addtionalPath + '/game',
      {
        params: {
          id: id,
        },
      }
    );
  }
  getLikedGameByUser(userId: number): Observable<GameInfo[]> {
    return this.httpClient.get<GameInfo[]>(
      environment.apiUrl + this.addtionalPath + '/liked',
      {
        params: {
          userId: userId,
        },
      }
    );
  }
  getSadGameByUser(userId: number): Observable<GameInfo[]> {
    return this.httpClient.get<GameInfo[]>(
      environment.apiUrl + this.addtionalPath + '/sad',
      {
        params: {
          userId: userId,
        },
      }
    );
  }
  addGameToLikedByUser(gf: GameInfo, userId: number): void {
    this.httpClient.post(environment.apiUrl + this.addtionalPath + '/liked', {
      params: {
        gameId: gf.id,
        userId: userId,
      },
    });
  }
  addGameToSadByUser(gf: GameInfo, userId: number): void {
    this.httpClient.post(environment.apiUrl + this.addtionalPath + '/sad', {
      params: {
        gameId: gf.id,
        userId: userId,
      },
    });
  }
  deleteGameToLikedByUser(gfd: number, userId: number): void {
    this.httpClient.delete(environment.apiUrl + this.addtionalPath + '/liked', {
      params: {
        gameId: gfd,
        userId: userId,
      },
    });
  }
  deleteGameToSadByUser(gfd: number, userId: number): void {
    this.httpClient.delete(environment.apiUrl + this.addtionalPath + '/sad', {
      params: {
        gameId: gfd,
        userId: userId,
      },
    });
  }
}
