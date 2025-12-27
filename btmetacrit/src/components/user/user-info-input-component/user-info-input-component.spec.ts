import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoInputComponent } from './user-info-input-component';

describe('UserInfoInputComponent', () => {
  let component: UserInfoInputComponent;
  let fixture: ComponentFixture<UserInfoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
