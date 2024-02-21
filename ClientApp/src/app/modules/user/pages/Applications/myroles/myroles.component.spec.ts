import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyrolesComponent } from './myroles.component';

describe('MyrolesComponent', () => {
  let component: MyrolesComponent;
  let fixture: ComponentFixture<MyrolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyrolesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
