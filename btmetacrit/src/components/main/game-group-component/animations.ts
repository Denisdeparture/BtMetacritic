import { animate, style, transition, trigger } from '@angular/animations';

const slideTransitionInRight = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(600px)' })),
]);
const slideTransitionLeft = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(-600px)' })),
]);

export const slideInR = trigger('slideInR', [slideTransitionInRight]);
export const slideInL = trigger('slideInL', [slideTransitionLeft]);
