import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLikedGame } from './user-liked-game';

describe('UserLikedGame', () => {
  let component: UserLikedGame;
  let fixture: ComponentFixture<UserLikedGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLikedGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserLikedGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
