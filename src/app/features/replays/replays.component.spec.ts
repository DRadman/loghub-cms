import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaysComponent } from './replays.component';

describe('ReplaysComponent', () => {
  let component: ReplaysComponent;
  let fixture: ComponentFixture<ReplaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReplaysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReplaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
