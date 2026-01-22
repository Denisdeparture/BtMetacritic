import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { GameStore } from './stores/game-user-store';
import { GameInfo, GameInfoItem } from '../types';
import { environment } from '../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class SteamApiService {
  httpClient = inject(HttpClient);

  storage = inject(GameStore);

  addtionalPath = '/game';

  takeFirstGames(count: number): Observable<GameInfo[]> {
    const games = this.httpClient
      .get<GameInfo[]>(environment.apiUrl + this.addtionalPath + '/takefirst', {
        params: {
          count: count,
        },
      })
      .pipe(
        catchError((er, r) => {
          console.error(er);
          return r;
        }),
      );
    return games;
  }
  getGame(id: number): Observable<GameInfo> {
    return this.httpClient
      .get<GameInfo>(environment.apiUrl + this.addtionalPath + '/infoById', {
        params: {
          id: id,
        },
      })
      .pipe(
        catchError((er, r) => {
          return [];
        }),
      );
  }
  getGamesByIds(ids: number[]): Observable<GameInfo[]> {
    return this.httpClient
      .get<GameInfo[]>(environment.apiUrl + this.addtionalPath + '/infoByIds', {
        params: {
          ids: ids,
        },
      })
      .pipe(
        catchError((er, r) => {
          return [];
        }),
      );
  }
  getGamesByName(name: string): Observable<GameInfoItem[]> {
    return this.httpClient
      .get<GameInfoItem[]>(
        environment.apiUrl + this.addtionalPath + '/infoByName',
        {
          params: {
            name: name,
          },
        },
      )
      .pipe(
        catchError((er, r) => {
          return [];
        }),
      );
  }
  getLikedGameByUser(userId: number): Observable<GameInfo[]> {
    return this.get(userId, '/liked');
  }
  getViewGameByUser(userId: number): Observable<GameInfo[]> {
    return this.get(userId, '/viewed');
  }
  addGameToLikedByUser(gf: GameInfo, userId: number): void {
    this.post(gf.id, userId, '/liked');
  }
  addGameToViewByUser(gf: GameInfo, userId: number): void {
    this.post(gf.id, userId, '/viewed');
  }
  deleteGameToLikedByUser(gfd: number, userId: number): void {
    this.delete(gfd, userId, '/liked');
  }
  deleteGameToViewByUser(gfd: number, userId: number): void {
    this.delete(gfd, userId, '/viewed');
  }

  delete(gid: number, uid: number, path: string): void {
    this.httpClient.delete(environment.apiUrl + this.addtionalPath + path, {
      params: {
        gameId: gid,
        userId: uid,
      },
    });
  }
  get(uid: number, path: string): Observable<GameInfo[]> {
    return this.httpClient.get<GameInfo[]>(
      environment.apiUrl + this.addtionalPath + path,
      {
        params: {
          userId: uid,
        },
      },
    );
  }
  post(gid: number, uid: number, path: string): void {
    this.httpClient.post(environment.apiUrl + this.addtionalPath + path, {
      params: {
        gameId: gid,
        userId: uid,
      },
    });
  }
}
