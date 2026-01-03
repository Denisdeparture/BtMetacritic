import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TextLengthDirective } from '../../../directives/text-length-directive';

@Component({
  selector: 'app-tooltip-component',
  imports: [TextLengthDirective],
  templateUrl: './tooltip-component.html',
  styleUrl: './tooltip-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  readonly info = input.required<TooltipInfo>();
  readonly maxlength = input<number>(25);
}
export type TooltipInfo = {
  title: string;
  dateRealese: Date;
  genre: string;
  linkForMoreInfo: string;
  description: string;
};
