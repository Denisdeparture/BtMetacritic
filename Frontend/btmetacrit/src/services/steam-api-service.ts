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
  getLikedGameByUser(token: string): Observable<GameInfo[]> {
    return this.get('/liked', token);
  }
  getViewGameByUser(token: string): Observable<GameInfo[]> {
    return this.get('/viewed', token);
  }
  addGameToLikedByUser(
    game: Pick<GameInfo, 'id' | 'name'>,
    token: string,
  ): void {
    this.post(game, '/liked', token);
  }
  addGameToViewByUser(
    game: Pick<GameInfo, 'id' | 'name'>,
    token: string,
  ): void {
    this.post(game, '/viewed', token);
  }
  deleteGameToLikedByUser(
    game: Pick<GameInfo, 'id' | 'name'>,
    token: string,
  ): void {
    this.delete(game, '/liked', token);
  }
  deleteGameToViewByUser(
    game: Pick<GameInfo, 'id' | 'name'>,
    token: string,
  ): void {
    this.delete(game, '/viewed', token);
  }

  delete(
    game: Pick<GameInfo, 'id' | 'name'>,
    path: string,
    token: string,
  ): void {
    this.httpClient
      .delete(environment.apiUrl + this.addtionalPath + path, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        params: {
          id: game.id,
          name: game.name,
        },
      })
      .subscribe();
  }
  get(path: string, token: string): Observable<GameInfo[]> {
    return this.httpClient.get<GameInfo[]>(
      environment.apiUrl + this.addtionalPath + path,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    );
  }
  post(game: Pick<GameInfo, 'id' | 'name'>, path: string, token: string): void {
    this.httpClient
      .post(environment.apiUrl + this.addtionalPath + path, game, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .subscribe();
  }
}
