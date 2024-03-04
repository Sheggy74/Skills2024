import { Component, inject } from '@angular/core';
import { ExperimentsService } from '../../../services/experiments.service';
import { Experiment } from 'src/app/Models/Experiment';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { UserHelper } from 'src/app/helpers/user/user-helper';


@Component({
  selector: 'app-experiments-list',
  templateUrl: './experiments-list.component.html',
  styleUrls: ['./experiments-list.component.css']
})
export class ExperimentsListComponent extends BaseComponent{

  experimentService = inject(ExperimentsService);

  selectedExperiment: Experiment|undefined

  userHelper = new UserHelper;

  override async ngOnInit(){
      super.ngOnInit();

      this.experimentService.experiments.next(await this.experimentService.getExperiments());
  }

}
