import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOnProjComponent } from './set-on-proj.component';

describe('SetOnProjComponent', () => {
  let component: SetOnProjComponent;
  let fixture: ComponentFixture<SetOnProjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetOnProjComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetOnProjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
