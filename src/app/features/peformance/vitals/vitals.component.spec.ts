import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitalsComponent } from './vitals.component';

describe('VitalsComponent', () => {
  let component: VitalsComponent;
  let fixture: ComponentFixture<VitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
