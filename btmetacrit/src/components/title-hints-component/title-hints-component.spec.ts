import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleHintsComponent } from './title-hints-component';

describe('TitleHintsComponent', () => {
  let component: TitleHintsComponent;
  let fixture: ComponentFixture<TitleHintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TitleHintsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TitleHintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
