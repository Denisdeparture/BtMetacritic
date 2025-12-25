import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed,  contentChild,  ElementRef, input, model,
   OnInit,
   output, OutputEmitterRef, 
   viewChild} from '@angular/core';


@Component({
  selector: 'app-button-component',
  imports: [CommonModule],
  templateUrl: './button-component.html',
  styleUrl: './button-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
 
  readonly titleWithContent = contentChild('title');

  readonly type = input.required<'submit' | 'reset' | 'button'>();
 
  readonly myClickChange: OutputEmitterRef<void> = output();

  readonly styles = model({
    'width': '200px',
    'height': '100px',
    'padding': '10px',
    'font-weight': '400',
  });

  actionChange(): void{
    this.myClickChange.emit();
  }

}
