import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExperimentComponent } from './add-edit-experiment.component';

describe('AddEditExperimentComponent', () => {
  let component: AddEditExperimentComponent;
  let fixture: ComponentFixture<AddEditExperimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditExperimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditExperimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
