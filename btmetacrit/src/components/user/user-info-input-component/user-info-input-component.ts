import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-info-input-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-info-input-component.html',
  styleUrl: './user-info-input-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInfoInputComponent {
  model = null;
  readonly value = model<string | number>();
  readonly baseParam = model<string | number>();
  readonly type = input.required<'email' | 'text' | 'number'>();

  saveChnages(): void{
    if(model === null) {return} 
    this.baseParam.set(model as any)
  }

}
