import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsUserDataComponent } from './forms-user-data.component';

describe('FormsUserDataComponent', () => {
  let component: FormsUserDataComponent;
  let fixture: ComponentFixture<FormsUserDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsUserDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
