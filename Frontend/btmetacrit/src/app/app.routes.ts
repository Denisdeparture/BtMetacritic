import { Routes } from '@angular/router';
import {
  gameDataResolver,
  sectionsResolver,
  userDataResolver,
} from '../resolvers';
export const LINKS = {
  MAIN: 'main',
  USER: 'user',
  GAME: 'game',
};
export const routes: Routes = [

  {
    path: LINKS.USER + '/:id',
    loadComponent: () =>
      import('../components/user/user-page-component/user-page-component').then(
        (c) => c.UserPageComponent
      ),
    resolve: {
      user: userDataResolver,
    },
  },
  {
    path: LINKS.GAME + '/:id',
    loadComponent: () =>
      import(
        '../components/game-view/game-view-component/game-view-component'
      ).then((c) => c.GameViewComponent),
    resolve: {
      game: gameDataResolver,
    },
  },
  {
    path: LINKS.MAIN,
    loadComponent: () =>
      import(
        '../components/main//main-page-component/main-page-component'
      ).then((c) => c.MainPageComponent),
    resolve: {
      sections: sectionsResolver,
    },
  },
    {
    path: '**',
    redirectTo: LINKS.MAIN
  },
];
