import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisConducteurComponent } from './avis-conducteur.component';

describe('AvisConducteurComponent', () => {
  let component: AvisConducteurComponent;
  let fixture: ComponentFixture<AvisConducteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisConducteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisConducteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
