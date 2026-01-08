import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoSpinner } from './to-do-spinner';

describe('ToDoSpinner', () => {
  let component: ToDoSpinner;
  let fixture: ComponentFixture<ToDoSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoSpinner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoSpinner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
