import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  viewChildren,
} from '@angular/core';
import {
  GameInfo,
  Price,
  Section,
  SliderGameObject,
  SliderObject,
  User,
} from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { delay, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInfoComponent } from '../user-info-component/user-info-component';
import { UserInfoInputComponent } from '../user-info-input-component/user-info-input-component';
import { ButtonComponent } from '../../common/button-component/button-component';
import { CaptionComponent } from '../../main/caption-component/caption-component';
import { SliderComponent } from '../../main/slider-component/slider-component';
import { mapToSliderInfoById } from '../../common/helpers';
import { KindOfSpinner } from '../../common/to-do-spinner/to-do-spinner';
import { ToDoSpinnerService } from '../../../services/to-do-spinner-service';
import { LikedGame, UserLikedGame } from '../user-liked-game/user-liked-game';
@Component({
  selector: 'app-user-page-component',
  providers: [ToDoSpinnerService],
  imports: [
    UserInfoComponent,
    UserInfoInputComponent,
    ButtonComponent,
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

  readonly user = computed(() => this.userSignal());

  readonly email = computed(() => this.user()?.info.mail + '');

  readonly likedGames = computed(() => this.user()?.likeGames);

  readonly fname = computed(
    () => this.user()?.info.firstname + ' ' + this.user()?.info.lastname
  );

  readonly img = computed(() => this.user()?.imgPath);

  readonly userTypeMap = computed(
    () => new Map(Object.entries(this.user()!.info))
  );
  ngOnInit(): void {
    this.spinner.showSpinner('#427b8c', KindOfSpinner.Elipse);
    setTimeout(() => {
      // RxJs ver
      this.userAsync.pipe(delay(200)).subscribe(() => {
        this.spinner.destroySpinner();
      });
    });
  }
  save(): void {
    for (const ui of this.userInputs()) {
      ui.saveChnages();
    }
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

  createSection(): Section[] {
    const customUserSection: Section = {
      id: 0,
      games: this.user()!.likeGames,
    };
    return [customUserSection]; // one section
  }
  mapToSlider(id: number): SliderGameObject[] {
    return mapToSliderInfoById(id, this.createSection());
  }
}
