import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { User } from '../../../types';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserInfoComponent } from '../user-info-component/user-info-component';
import { UserInfoInputComponent } from '../user-info-input-component/user-info-input-component';

@Component({
  selector: 'app-user-page-component',
  imports: [UserInfoComponent, UserInfoInputComponent],
  templateUrl: './user-page-component.html',
  styleUrl: './user-page-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent {
   route = inject(ActivatedRoute);

  userAsync = this.route.data.pipe(
    map((data) => data['user'] as User)
  );

  readonly userSignal = toSignal(this.userAsync); 

  readonly user = computed(() => this.userSignal());

  readonly email = computed(() => this.user()?.info.mail + '');

  readonly fname = computed(() => this.user()?.info.firstname + " " + this.user()?.info.lastname)

  readonly img = computed(() => this.user()?.imgPath)

  
}
