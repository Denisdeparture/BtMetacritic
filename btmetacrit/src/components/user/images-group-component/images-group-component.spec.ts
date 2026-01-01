import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesGroupComponent } from './images-group-component';

describe('ImagesGroupComponent', () => {
  let component: ImagesGroupComponent;
  let fixture: ComponentFixture<ImagesGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
