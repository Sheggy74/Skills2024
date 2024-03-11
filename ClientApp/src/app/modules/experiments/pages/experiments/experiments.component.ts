import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent {

  private router = inject(Router);

  onAdd(){
    this.router.navigateByUrl('/experiments/new');
  }

}
