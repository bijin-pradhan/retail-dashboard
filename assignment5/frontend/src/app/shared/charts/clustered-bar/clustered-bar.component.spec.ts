import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteredBarComponent } from './clustered-bar.component';

describe('ClusteredBarComponent', () => {
  let component: ClusteredBarComponent;
  let fixture: ComponentFixture<ClusteredBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClusteredBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusteredBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
