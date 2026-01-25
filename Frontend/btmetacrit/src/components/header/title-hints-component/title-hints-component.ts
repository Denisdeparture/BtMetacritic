import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-title-hints-component',
  imports: [],
  templateUrl: './title-hints-component.html',
  styleUrl: './title-hints-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleHintsComponent implements OnInit {
  renderer = inject(Renderer2);

  host = inject(ElementRef);

  listEl = this.renderer.createElement('ul');

  readonly title = input.required<string>();

  readonly listHints = model<Map<string, string>>();

  @HostListener('mouseenter') onMouseEnter(): void {
    this.renderer.setStyle(this.listEl, 'display', 'block'); // Maybe opacity 1-0
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.renderer.setStyle(this.listEl, 'display', 'none'); // Maybe opacity 1-0
  }
  ngOnInit(): void {
    this.renderer.addClass(this.listEl, NAMES.list);

    if (!this.listHints()) {
      return;
    }
    for (const hint of this.listHints()!) {
      const li = this.renderer.createElement('li');

      this.renderer.addClass(li, NAMES.el);

      const titleHint = hint[0];

      this.renderer.appendChild(li, this.renderer.createText(titleHint));

      this.renderer.appendChild(this.listEl, li);
    }
    this.renderer.setStyle(this.listEl, 'display', 'none');
    this.renderer.setStyle(this.listEl, 'position', 'absolute');
    this.renderer.appendChild(this.host.nativeElement, this.listEl);
  }
}
const NAMES = {
  list: 'list-hints',
  el: 'list-hints-el',
};
