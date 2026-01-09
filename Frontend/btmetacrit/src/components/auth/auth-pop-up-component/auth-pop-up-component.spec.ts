import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPopUpComponent } from './auth-pop-up-component';

describe('AuthPopUpComponent', () => {
  let component: AuthPopUpComponent;
  let fixture: ComponentFixture<AuthPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
