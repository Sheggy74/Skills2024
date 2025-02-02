import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAnalyticsComponent } from './my-analytics.component';

describe('MyAnalyticsComponent', () => {
  let component: MyAnalyticsComponent;
  let fixture: ComponentFixture<MyAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
