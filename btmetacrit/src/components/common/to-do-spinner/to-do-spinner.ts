import { ChangeDetectionStrategy, Component, ElementRef, inject, input, model, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-to-do-spinner',
  imports: [],
  templateUrl: './to-do-spinner.html',
  styleUrl: './to-do-spinner.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoSpinner {

  readonly color = model<string>();

  readonly kind = model<KindOfSpinner>(KindOfSpinner.Spinner);
  
  renderer = inject(Renderer2);
  
  host = inject(ElementRef);

  baseEl: HTMLDivElement = this.renderer.createElement('div')

  base: HTMLDivElement = this.renderer.createElement('div')

  setBase(color: string, kind: KindOfSpinner, background?: string): void{
    this.renderer.addClass( this.base, 'spinner-' + kind)
    this.renderer.addClass(this.baseEl, 'spinner-base-' + kind);
    this.renderer.setStyle(this.host.nativeElement, 'background', background); 
    this.renderer.setStyle(this.base, 'position', 'absolute')
    this.renderer.setStyle(this.base, 'top', '40%');
    this.renderer.setStyle(this.base, 'left', '50%');
    this.color.set(color);
    this.kind.set(kind);
    this.configurate();
  }

  private configurate(): void {
    this.renderer.appendChild(this.base, this.baseEl);
    this.renderer.appendChild(this.host.nativeElement, this.base)
    this.calculateDiv();
  }

  private calculateDiv(): void {
     for(let i = 0; i < this.kind()!; i++){

      const div: HTMLDivElement = this.renderer.createElement('div');

      this.renderer.setStyle(div, 'background', this.color())

      this.renderer.appendChild(this.baseEl, div)

     }
  }

}
export enum KindOfSpinner {
  Elipse = 5,
  Spinner = 12
}
