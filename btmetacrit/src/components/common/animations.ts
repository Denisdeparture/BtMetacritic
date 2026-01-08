import { animate, style, transition, trigger } from '@angular/animations';

const slideTransitionInRight = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(600px)' })),
]);
const slideTransitionLeft = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(-600px)' })),
]);

export const slideInR = trigger('slideInR', [slideTransitionInRight]);
export const slideInL = trigger('slideInL', [slideTransitionLeft]);

export const developTransitionImg = transition(':enter', [
  style({ opacity: 0 }),
  animate('0.5s ease-in', style({ opacity: 1 })),
]);

export const develop = trigger('developImg', [developTransitionImg]);
