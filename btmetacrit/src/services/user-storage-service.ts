import { inject, Injectable } from '@angular/core';
import { User } from '../types';
import { GameStorageService } from './game-storage-service';
@Injectable({ providedIn: 'root' })
export class UserStorageService {
  gameStorage = inject(GameStorageService);
  getUser(id: number): User {
    return {
      id: id,
      likeGames: [this.gameStorage.getSilksong('Test')],
      info: {
        firstname: 'Test',
        lastname: 'All',
        mail: 'test@gmail.com',
        location: 'Ru',
        age: 16,
      },
      //../../../assets/img/logoSiteMetacrit.png
      imgPath: '../../../assets/img/logoSiteMetacrit.png',
    };
  }
}
