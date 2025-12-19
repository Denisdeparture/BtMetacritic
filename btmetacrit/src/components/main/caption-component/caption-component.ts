import { AfterContentInit, ChangeDetectionStrategy, 
  Component, computed, contentChild, ElementRef, input, 
  viewChild} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-caption-component',
  imports: [RouterLink],
  templateUrl: './caption-component.html',
  styleUrl: './caption-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaptionComponent implements AfterContentInit {

  readonly element = contentChild<ElementRef>('title')

  readonly title = computed(() => (this.element()?.nativeElement as HTMLParagraphElement).textContent )

  readonly rootForLink = input<string>();

  ngAfterContentInit(): void {
    console.log(this.title());
  }
}
