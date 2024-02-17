import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenLoadsComponent } from './screen-loads.component';

describe('ScreenLoadsComponent', () => {
  let component: ScreenLoadsComponent;
  let fixture: ComponentFixture<ScreenLoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenLoadsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScreenLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
