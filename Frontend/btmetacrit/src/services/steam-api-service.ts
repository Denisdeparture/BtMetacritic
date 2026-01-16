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
      },
    );
  }
  getGame(id: number): Observable<GameInfo> {
    return this.httpClient.get<GameInfo>(
      environment.apiUrl + this.addtionalPath + '/game',
      {
        params: {
          id: id,
        },
      },
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
