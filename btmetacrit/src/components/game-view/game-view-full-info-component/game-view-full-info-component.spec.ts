import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameViewFullInfoComponent } from './game-view-full-info-component';

describe('GameViewFullInfoComponent', () => {
  let component: GameViewFullInfoComponent;
  let fixture: ComponentFixture<GameViewFullInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameViewFullInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameViewFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
