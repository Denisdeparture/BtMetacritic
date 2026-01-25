import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Hint } from '../../types';

@Injectable({ providedIn: 'any' })
export class HintsService {
  private hintstore = new BehaviorSubject<Hint[]>([]);

  setCurrentHints(hints: Hint[]): void {
    this.hintstore.next(hints);
  }

  getCurrentHints(): Observable<Hint[]> {
    return this.hintstore.asObservable();
  }
}
