import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltretrajetComponent } from './filtretrajet.component';

describe('FiltretrajetComponent', () => {
  let component: FiltretrajetComponent;
  let fixture: ComponentFixture<FiltretrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltretrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltretrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
