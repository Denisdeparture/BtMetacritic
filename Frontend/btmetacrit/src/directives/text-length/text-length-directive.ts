import {
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTextLengthDirective]',
})
export class TextLengthDirective implements OnInit {
  rerender = inject(Renderer2);

  host = inject(ElementRef);

  readonly func = output<string | undefined>();

  readonly link = input<string>();

  readonly maxLength = input.required<number>();

  readonly someText = input<string>();

  ngOnInit(): void {
    const paragraph = this.host.nativeElement as HTMLParagraphElement;

    if (!paragraph) {
      return;
    }

    const text = paragraph.textContent;

    if (text!.length < this.maxLength()) {
      return;
    }

    this.rerender.setValue(this.host.nativeElement, '');

    const link: HTMLAnchorElement = this.rerender.createElement('a');

    this.rerender.listen(link, 'click', () => {
     this.func.emit(this.link())
    });

    link.text = '...' + this.someText();

    this.rerender.setStyle(link, 'margin', '0');

    const newtext = text!.substring(0, this.maxLength());

    this.rerender.appendChild(
      this.host.nativeElement,
      this.rerender.createText(newtext)
    );
    this.rerender.appendChild(this.host.nativeElement, link);
  }
}