import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignRechercheComponent } from './design-recherche.component';

describe('DesignRechercheComponent', () => {
  let component: DesignRechercheComponent;
  let fixture: ComponentFixture<DesignRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignRechercheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
