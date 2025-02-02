import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPieChartComponent } from './tasks-pie-chart.component';

describe('TasksPieChartComponent', () => {
  let component: TasksPieChartComponent;
  let fixture: ComponentFixture<TasksPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPieChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TasksPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
