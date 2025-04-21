import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpoolingCalculatorComponent } from './carpooling-calculator.component';

describe('CarpoolingCalculatorComponent', () => {
  let component: CarpoolingCalculatorComponent;
  let fixture: ComponentFixture<CarpoolingCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarpoolingCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpoolingCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
