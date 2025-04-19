import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecherchetrajetComponent } from './recherchetrajet.component';

describe('RecherchetrajetComponent', () => {
  let component: RecherchetrajetComponent;
  let fixture: ComponentFixture<RecherchetrajetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecherchetrajetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecherchetrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
