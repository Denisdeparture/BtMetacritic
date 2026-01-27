import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderCallbackComponent } from './provider-callback-component';

describe('ProviderCallbackComponent', () => {
  let component: ProviderCallbackComponent;
  let fixture: ComponentFixture<ProviderCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderCallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
