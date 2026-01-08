import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameViewFullDescriptionComponent } from './game-view-full-description-component';

describe('GameViewFullDescriptionComponent', () => {
  let component: GameViewFullDescriptionComponent;
  let fixture: ComponentFixture<GameViewFullDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameViewFullDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameViewFullDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
