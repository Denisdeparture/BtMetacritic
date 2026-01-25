import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  viewChildren,
} from '@angular/core';
import {
  GameInfo,
  Price,
  Section,
  SimpleUserInfo,
  SliderGameObject,
  SliderObject,
  User,
} from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { delay, map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInfoComponent } from '../user-info-component/user-info-component';
import { UserInfoInputComponent } from '../user-info-input-component/user-info-input-component';
import { ButtonComponent } from '../../common/button-component/button-component';
import { CaptionComponent } from '../../main/caption-component/caption-component';
import { SliderComponent } from '../../main/slider-component/slider-component';
import { mapToSliderInfoById } from '../../common/helpers';
import { KindOfSpinner } from '../../common/to-do-spinner/to-do-spinner';
import { LikedGame, UserLikedGame } from '../user-liked-game/user-liked-game';
import { HintsService } from '../../../services/views/hints-service';
import { ToDoSpinnerService } from '../../../services/views/to-do-spinner-service';
import { SteamApiService } from '../../../services/steam-api-service';
import { TokenStore } from '../../../services/stores/token-store';
@Component({
  selector: 'app-user-page-component',
  providers: [ToDoSpinnerService],
  imports: [
    UserInfoComponent,
    UserInfoInputComponent,
    CaptionComponent,
    SliderComponent,
    UserLikedGame,
  ],
  templateUrl: './user-page-component.html',
  styleUrl: './user-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent implements OnInit {
  route = inject(ActivatedRoute);

  spinner = inject(ToDoSpinnerService);

  searchService = inject(SteamApiService);

  tokenStorage = inject(TokenStore);

  rerender = inject(Renderer2);

  hints = inject(HintsService);

  userAsync = this.route.data.pipe(map((data) => data['user'] as User));

  styles = {
    width: '150px',
    height: '30px',
    padding: '5px',
    'font-weight': '400',
    'font-size': '14px',
  };
  readonly userInputs = viewChildren(UserInfoInputComponent);

  readonly userSignal = toSignal(this.userAsync);

  readonly recentSeeGames = toSignal(this.getViewsGames());

  readonly likedGames = toSignal(this.getLikesGames());

  readonly user = computed(() => this.userSignal());

  readonly info = computed(() => this.user()?.info);

  readonly email = computed(() => this.info()?.email ?? '' + '');

  getLikesGames(): Observable<GameInfo[]> {
    const games = this.searchService.getLikedGameByUser(
      this.tokenStorage.accessToken(),
    );
    games.subscribe((x) => {
      console.log(x);
    });

    return games;
  }
  getViewsGames(): Observable<GameInfo[]> {
    const games = this.searchService.getViewGameByUser(
      this.tokenStorage.accessToken(),
    );
    games.subscribe();

    return games;
  }

  readonly fname = computed(
    () => (this.info()?.firstname ?? '') + ' ' + (this.info()?.lastname ?? ''),
  );

  readonly liked = viewChildren(UserLikedGame);

  readonly img = computed(() => this.user()?.imgPath);

  readonly userTypeMap = computed(
    () => new Map<string, string>(Object.entries(this.user()!.info!)),
  );
  convertToParam(param: string): keyof SimpleUserInfo {
    return param as keyof SimpleUserInfo;
  }
  ngOnInit(): void {
    this.hints.setCurrentHints([
      { id: 0, title: 'user' },
      { id: 1, title: 'saw it' },
    ]);
    this.spinner.showSpinner('#427b8c', KindOfSpinner.Elipse);
    setTimeout(() => {
      this.userAsync.pipe(delay(200)).subscribe(() => {
        this.spinner.destroySpinner();
      });
    });
  }
  getType(obj: any): any {
    return typeof obj;
  }
  mapToLikedGame(gf: GameInfo): LikedGame {
    return {
      name: gf.name,
      price_overview: gf.price_overview,
      header_image: gf.header_image,
      screenshots: gf.screenshots,
    };
  }
  changeLikes(event: [boolean, ElementRef]): void {
    if (!event[0]) {
      this.rerender.setStyle(event[1].nativeElement, 'display', 'none');
    }
  }
  createSection(): Section[] {
    const customUserSection: Section = {
      id: 0,
      games: this.recentSeeGames(),
    };
    return [customUserSection]; // one section
  }
  mapToSlider(id: number): SliderGameObject[] {
    return mapToSliderInfoById(id, this.createSection());
  }
}
