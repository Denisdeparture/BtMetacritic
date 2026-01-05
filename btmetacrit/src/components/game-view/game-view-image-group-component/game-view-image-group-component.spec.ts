import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameViewImageGroupComponent } from './game-view-image-group-component';

describe('GameViewImageGroupComponent', () => {
  let component: GameViewImageGroupComponent;
  let fixture: ComponentFixture<GameViewImageGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameViewImageGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameViewImageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
