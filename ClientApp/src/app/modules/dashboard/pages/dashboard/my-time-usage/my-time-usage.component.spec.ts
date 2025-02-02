import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTimeUsageComponent } from './my-time-usage.component';

describe('MyTimeUsageComponent', () => {
  let component: MyTimeUsageComponent;
  let fixture: ComponentFixture<MyTimeUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTimeUsageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyTimeUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
