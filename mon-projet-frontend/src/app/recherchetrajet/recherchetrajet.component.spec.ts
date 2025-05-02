import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheTrajetComponent } from './recherchetrajet.component';

describe('RecherchetrajetComponent', () => {
  let component: RechercheTrajetComponent;
  let fixture: ComponentFixture<RechercheTrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheTrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
