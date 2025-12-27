import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-user-info-component',
  imports: [],
  templateUrl: './user-info-component.html',
  styleUrl: './user-info-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoComponent {
  readonly fullName = input.required<string>();
  readonly mail = input.required<string>();
  readonly imgPath = input<string>();

  close(): void{
    // add exit from profile logic
    
  }
}
