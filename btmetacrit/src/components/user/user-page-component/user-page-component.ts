import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { Section, SliderObject, User } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInfoComponent } from '../user-info-component/user-info-component';
import { UserInfoInputComponent } from '../user-info-input-component/user-info-input-component';
import { ButtonComponent } from "../../common/button-component/button-component";
import { CaptionComponent } from "../../main/caption-component/caption-component";
import { SliderComponent } from "../../main/slider-component/slider-component";
import { mapToSliderInfoById } from '../../common/helpers';
@Component({
  selector: 'app-user-page-component',
  imports: [UserInfoComponent, UserInfoInputComponent, ButtonComponent, CaptionComponent, SliderComponent],
  templateUrl: './user-page-component.html',
  styleUrl: './user-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
   route = inject(ActivatedRoute);

  userAsync = this.route.data.pipe(
    map((data) => data['user'] as User)
  );

 styles = {
    'width': '150px',
    'height': '30px',
    'padding': '5px',
    'font-weight': '400',
    'font-size': '14px'
  };
  readonly userInputs = viewChildren(UserInfoInputComponent);

  readonly userSignal = toSignal(this.userAsync); 

  readonly user = computed(() => this.userSignal());

  readonly email = computed(() => this.user()?.info.mail + '');

  readonly fname = computed(() => this.user()?.info.firstname + " " + this.user()?.info.lastname)

  readonly img = computed(() => this.user()?.imgPath)

  readonly userTypeMap = computed(() => new Map(Object.entries(this.user()!.info)))
  save(): void{
    for(const ui of this.userInputs()){
      ui.saveChnages();
    }
  }
  getType(obj: any): any{
      return typeof obj;
  }
  createSection(): Section[]{
    const customUserSection: Section = {
      id: 0,
      games: this.user()!.likeGames
    }; 
    return [customUserSection]
  }
  mapToSlider(id: number): SliderObject[]{
    return mapToSliderInfoById(id,this.createSection());
  }
}
