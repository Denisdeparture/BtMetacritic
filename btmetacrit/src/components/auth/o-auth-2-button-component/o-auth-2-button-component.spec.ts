import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OAuth2ButtonComponent } from './o-auth-2-button-component';

describe('OAuth2ButtonComponent', () => {
  let component: OAuth2ButtonComponent;
  let fixture: ComponentFixture<OAuth2ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OAuth2ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OAuth2ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
