import { inject, Injectable } from '@angular/core';
import { User } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { UserStore } from './stores/user-store';
@Injectable({ providedIn: 'root' })
export class UserService {
  httpClient = inject(HttpClient);
  userStore = inject(UserStore);
  additionalPath = '/about';

  getUsers(): Observable<User[]> {
    const obsr = this.httpClient.get<User[]>(
      environment.apiUrl + this.additionalPath + '/all',
    );
    obsr.subscribe((users) => {
      for (const user of users) {
        this.userStore.addUser(user);
      }
    });
    return obsr;
  }
  getUser(id: number): Observable<User> {
    const obsr = this.httpClient.get<User>(
      environment.apiUrl + this.additionalPath,
      {
        params: {
          id: id,
        },
      },
    );
    obsr.subscribe((user) => {
      this.userStore.addUser(user);
    });
    return obsr;
  }
  addUser(user: User): void {
    this.userStore.addUser(user);
    this.httpClient.post<User>(environment.apiUrl + this.additionalPath, user);
  }
  updateUser(id: number, newdata: User) {
    this.httpClient.patch(environment.apiUrl + this.additionalPath, newdata, {
      params: {
        id: id,
      },
    });
    this.userStore.updateUser(newdata);
  }
  deleteUser(id: number) {
    this.httpClient.delete(environment.apiUrl + this.additionalPath, {
      params: {
        id: id,
      },
    });
    this.userStore.deleteUser(id);
  }
}
