import { Routes } from '@angular/router';
import { sectionsResolver } from '../resolvers';
const LINKS = {
    MAIN: 'main'
}
export const routes: Routes = [
    {
        path: LINKS.MAIN,
         loadComponent: () =>
          import('../components/main//main-page-component/main-page-component').then((c) => c.MainPageComponent),
         resolve: {
            sections: sectionsResolver
         }
         // if you get a bag with route see your old repo
    }
];
