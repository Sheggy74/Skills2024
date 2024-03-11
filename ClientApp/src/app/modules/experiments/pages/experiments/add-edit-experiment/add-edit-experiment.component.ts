import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Experiment } from 'src/app/Models/Experiment';

@Component({
  selector: 'app-add-edit-experiment',
  templateUrl: './add-edit-experiment.component.html',
  styleUrls: ['./add-edit-experiment.component.css']
})
export class AddEditExperimentComponent {

  private router = inject(Router);
  public experiment: Experiment = {};

  onCancel() {
    this.moveBack();
  }

  onCreateEdit(){
    console.log(this.experiment);

  }

  private moveBack(){
    this.router.navigateByUrl('/experiments');
  }

}
