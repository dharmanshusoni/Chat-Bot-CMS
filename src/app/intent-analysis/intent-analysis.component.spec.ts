import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentAnalysisComponent } from './intent-analysis.component';

describe('IntentAnalysisComponent', () => {
  let component: IntentAnalysisComponent;
  let fixture: ComponentFixture<IntentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntentAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
