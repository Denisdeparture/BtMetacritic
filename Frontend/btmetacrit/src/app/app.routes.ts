import { Routes } from '@angular/router';
import { mainResolver, searchResolver, userResolver } from '../resolvers';
export const LINKS = {
  MAIN: 'main',
  USER: 'user',
  GAME: 'game',
  SEARCH: 'search',
};
export const routes: Routes = [
  {
    path: LINKS.GAME + '/:id',
    loadComponent: () =>
      import('../components/game-view/game-view-component/game-view-component').then(
        (c) => c.GameViewComponent,
      ),
  },
  {
    path: LINKS.USER,
    loadComponent: () =>
      import('../components/user/user-page-component/user-page-component').then(
        (c) => c.UserPageComponent,
      ),
    resolve: {
      user: userResolver,
    },
  },
  {
    path: LINKS.MAIN,
    loadComponent: () =>
      import('../components/main//main-page-component/main-page-component').then(
        (c) => c.MainPageComponent,
      ),
    resolve: {
      sections: mainResolver,
    },
  },
  {
    path: LINKS.SEARCH,
    loadComponent: () =>
      import('../components/common/search-section/search-section').then(
        (c) => c.SearchSection,
      ),
    resolve: {
      sections: searchResolver,
    },
  },
  {
    path: '**',
    redirectTo: LINKS.MAIN,
  },
];
