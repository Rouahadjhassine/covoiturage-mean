import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassegerprofileComponent } from './passegerprofile.component';

describe('PassegerprofileComponent', () => {
  let component: PassegerprofileComponent;
  let fixture: ComponentFixture<PassegerprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassegerprofileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PassegerprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
