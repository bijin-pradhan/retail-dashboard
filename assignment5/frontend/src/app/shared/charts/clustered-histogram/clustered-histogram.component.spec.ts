import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteredHistogramComponent } from './clustered-histogram.component';

describe('ClusteredHistogramComponent', () => {
  let component: ClusteredHistogramComponent;
  let fixture: ComponentFixture<ClusteredHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClusteredHistogramComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteredHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
