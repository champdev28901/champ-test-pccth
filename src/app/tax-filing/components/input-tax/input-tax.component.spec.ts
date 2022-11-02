import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTaxComponent } from './input-tax.component';

describe('InputTaxComponent', () => {
  let component: InputTaxComponent;
  let fixture: ComponentFixture<InputTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
