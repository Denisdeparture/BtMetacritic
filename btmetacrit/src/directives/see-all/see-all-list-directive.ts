import {
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appSeeAllListDirective]',
})
export class SeeAllListDirective implements OnInit {
  host = inject(ElementRef);
  rerender = inject(Renderer2);
  readonly dropDownlist = input.required<any[]>();
  readonly maxheight = input.required<number>();
  readonly beginWith = input<number>(0);
  readonly isNeedMargin = input<boolean>(false);
  readonly textForButtonClose = input<string>("Close")
  readonly textForLinkOpen = input<string>("See all")

  linkOpen = this.createLinkOpen();

  listEl = this.rerender.createElement('ul');

  buttonClose = this.createButtonClose(70,30);


  ngOnInit(): void {
    this.createList();
    this.hide()
  }
  show(): void {
    this.rerender.setStyle(this.listEl, 'display', 'block');
    this.rerender.setStyle(this.buttonClose, 'display', 'block')
    this.rerender.setStyle(this.linkOpen, 'display', 'none');
  }
  hide(): void {
    this.rerender.setStyle(this.listEl, 'display', 'none');
    this.rerender.setStyle(this.buttonClose, 'display', 'none');
    this.rerender.setStyle(this.linkOpen, 'display', 'inline');
  }
  createLinkOpen(): HTMLAnchorElement{
    const a: HTMLAnchorElement = this.rerender.createElement('a');

    a.text = this.textForLinkOpen();

    this.rerender.listen(a, 'click', () => {
     this.afterClick(true);
    });

    this.rerender.appendChild(this.host.nativeElement, a);

    this.rerender.setStyle(a, 'cursor', 'pointer');

    return a;

  }
  createButtonClose(width?: number, height?: number): HTMLButtonElement{
    const button: HTMLButtonElement = this.rerender.createElement('button');

    const text = this.rerender.createText(this.textForButtonClose());

    this.rerender.appendChild(button, text);

    this.rerender.setStyle(button, 'width', width + 'px')
    this.rerender.setStyle(button, 'height', height + 'px')

    this.rerender.setAttribute(button, 'type', 'button');

    this.rerender.listen(button, 'click', () => {
     this.afterClick(false);
    });

    this.rerender.appendChild(this.host.nativeElement, button)

    return button;
  }
  afterClick(cond: boolean): void{
    if(cond){
      this.show();
    }
    else{
      this.hide();
    }

  }
  createList(): void {
    this.rerender.setStyle(this.listEl, 'list-style', 'none');

    for (let i = this.beginWith(); i < this.dropDownlist().length; i++) {

      const el = this.rerender.createText(this.dropDownlist()[i]);

      const li = this.rerender.createElement('li');

      this.rerender.appendChild(li, el);

      this.rerender.appendChild(this.listEl, li);
    }
    this.rerender.setStyle(this.listEl, 'max-height', this.maxheight() + 'px');
    this.rerender.appendChild(this.host.nativeElement, this.listEl);
   
  }
}
