import { animate, style, transition, trigger } from '@angular/animations';

export const slideTransitionInRight = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(600px)' })),
]);
export const slideTransitionLeft = transition(':enter', [
  animate('1s ease-in', style({ transform: 'translateX(-600px)' })),
]);

export const slideInR = trigger('slideInR', [slideTransitionInRight]);
export const slideInL = trigger('slideInL', [slideTransitionLeft]);

export const developTransitionImg = transition(':enter', [
  style({ opacity: 0 }),
  animate('0.5s ease-in', style({ opacity: 1 })),
]);

export const develop = trigger('developImg', [developTransitionImg]);
export const showAnimate = transition(':enter', [
  style({opacity: 0, transform: 'translateY(-20px)'}),
  animate('1s ease-in', style({transform: 'translateY(0px)', opacity: 1}))
])
export const show = trigger('show', [showAnimate])