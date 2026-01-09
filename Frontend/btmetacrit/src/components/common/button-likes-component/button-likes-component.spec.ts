import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLikesComponent } from './button-likes-component';

describe('ButtonLikesComponent', () => {
  let component: ButtonLikesComponent;
  let fixture: ComponentFixture<ButtonLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLikesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
