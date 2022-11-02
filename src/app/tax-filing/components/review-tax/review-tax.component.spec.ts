import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTaxComponent } from './review-tax.component';

describe('ReviewTaxComponent', () => {
  let component: ReviewTaxComponent;
  let fixture: ComponentFixture<ReviewTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
