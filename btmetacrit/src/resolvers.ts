import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GameStorageService } from "./services/game-storage-service";
import { Section, User } from "./types";
import { UserStorageService } from "./services/user-storage-service";

export const sectionsResolver: ResolveFn<Section[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const storage = inject(GameStorageService);

  return storage.getSections(); // Получаем данные
};
export const userDataResolver: ResolveFn<User>  = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const storage = inject(UserStorageService);

  if(route.queryParams['id']) {console.log("Id was null");}
  

  return storage.getUser(route.queryParams['id']);
}