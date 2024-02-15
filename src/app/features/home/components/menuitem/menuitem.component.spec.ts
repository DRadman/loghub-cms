import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuitemComponent } from './menuitem.component';

describe('MenuitemComponent', () => {
  let component: MenuitemComponent;
  let fixture: ComponentFixture<MenuitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
