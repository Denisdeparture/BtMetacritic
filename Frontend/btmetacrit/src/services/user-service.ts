import { inject, Injectable } from '@angular/core';
import { User } from '../types';
import { SectionStorageService } from './sections-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class UserService {
  gameStorage = inject(SectionStorageService);

  httpClient = inject(HttpClient);

  additionalPath = '/about';

  getUsers(): Observable<User[]> {}
  getUser(id: number): Observable<User> {}
  addUser(user: User): void {}
  updateUser(id: number, newdata: User) {}
  deleteUser(id: number) {}
}
