import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { GameStorageService } from "./services/storage-service";
import { Section } from "./types";

export const sectionsResolver: ResolveFn<Section[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const storage = inject(GameStorageService);

  return storage.getSections(); // Получаем данные
};