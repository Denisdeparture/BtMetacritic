import { Routes } from '@angular/router';
import { sectionsResolver, userDataResolver } from '../resolvers';
const LINKS = {
    MAIN: 'main',
    USER: 'user'
}
export const routes: Routes = [
    {
        path: LINKS.MAIN,
         loadComponent: () =>
          import('../components/main//main-page-component/main-page-component').then((c) => c.MainPageComponent),
         resolve: {
            sections: sectionsResolver
         },
     
         
         // if you get a bag with route see your old repo
    },
    {
        path: LINKS.USER + '/id',
        loadComponent: () => import('../components/user/user-page-component/user-page-component')
        .then((c) => c.UserPageComponent),
        resolve: {
            user: userDataResolver
        }
    }
];
