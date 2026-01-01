import { AfterContentInit, ChangeDetectionStrategy, 
  Component, computed, contentChild, ElementRef, HostBinding, input, 
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

  @HostBinding('style.justify-content') content = 'center'

  readonly orientation = input<'center' | 'start' | 'end'>('center'); 

  readonly element = contentChild<ElementRef>('title')

  readonly isHasLink = input<boolean>(true);

  readonly title = computed(() => (this.element()?.nativeElement as HTMLParagraphElement).textContent )

  readonly rootForLink = input<string>();

  ngAfterContentInit(): void {
    this.content = this.orientation();
    console.log(this.title());
  }
}
