import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformersTableComponent } from './performers-table.component';

describe('PerformersTableComponent', () => {
  let component: PerformersTableComponent;
  let fixture: ComponentFixture<PerformersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformersTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
