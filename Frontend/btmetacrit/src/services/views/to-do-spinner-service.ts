import {
  ApplicationRef,
  ComponentRef,
  inject,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import {
  KindOfSpinner,
  ToDoSpinner,
} from '../../components/common/to-do-spinner/to-do-spinner';

@Injectable({ providedIn: 'any' })
export class ToDoSpinnerService {
  private component?: ComponentRef<ToDoSpinner>;

  private componentFactory = inject(ViewContainerRef);

  private appRef = inject(ApplicationRef);

  private injector = inject(Injector);

  showSpinner(color: string, kind: KindOfSpinner, data?: any): ToDoSpinner {
    const componentRef = this.componentFactory.createComponent(ToDoSpinner, {
      injector: this.injector,
    });

    if (data) {
      Object.assign(componentRef.instance as object, data);
    }

    componentRef.instance.setBase(color, kind, 'rgba(0, 0, 0, 0.144)');

    this.component = componentRef;

    return componentRef.instance;
  }
  destroySpinner(): void {
    this.appRef.detachView(this.component!.hostView);
    this.component!.destroy();
  }
}
