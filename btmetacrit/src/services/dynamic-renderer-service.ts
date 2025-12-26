import { ViewContainerRef } from "@angular/core";
import { ApplicationRef, ComponentRef, inject, Injectable, Injector, Type } from "@angular/core";

@Injectable({
  providedIn: 'any',
})
export class DynamicComponentRenderer<T>  {
  component?: ComponentRef<T>;

  private componentFactory = inject(ViewContainerRef);

  private appRef = inject(ApplicationRef);

  private injector = inject(Injector);

  spawn(component: Type<T>, data?: any ): T{

    const componentRef = this.componentFactory.createComponent(component,{ injector: this.injector } );

    if (data) { Object.assign(componentRef.instance as object, data); }

    //componentRef.instance.setBase(color, kind, 'rgba(0, 0, 0, 0.144)'); do some

    this.component = componentRef;

    return componentRef.instance;
  }
  destroyComponent(): void {
    this.appRef.detachView(this.component!.hostView);
    this.component!.destroy();
  }
}