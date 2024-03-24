import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ExperimentsService } from '../../services/experiments.service';
import { Experiment } from 'src/app/Models/Experiment';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.css']
})
export class ExperimentsComponent implements OnInit{


  private router = inject(Router);
  private experimentService = inject(ExperimentsService);

  public experiment?: Experiment = undefined;

  ngOnInit(): void {
      this.experimentService.selectedExperiment.subscribe(res => {
        this.experiment = res;
      })
  }


  onAdd(){
    this.experimentService.selectedExperiment.next(undefined);
    this.router.navigateByUrl('/experiments/new');
  }

  onEdit() {
    this.router.navigateByUrl('/experiments/edit');
  }

  async onDelete(){
    this.experimentService.isLoading.next(true);
    this.experimentService.deleteExperiment(Number.parseInt(this.experiment!.id!));
    await this.experimentService.updateData();
    this.experimentService.isLoading.next(false);
  }

}
