import { Component, OnInit, Type, inject } from '@angular/core';
import { Experiment } from 'src/app/Models/Experiment';
import { ExperimentsService } from '../../../services/experiments.service';
import { AdminUserService } from 'src/app/modules/admin/services/admin-user-service/admin-user.service';
import { User } from 'src/app/Models/User';
import { ValidationComponent } from 'src/app/system-components/validation/validation.component';
import { BehaviorSubject } from 'rxjs';
import { Tool } from 'src/app/Models/Tool';
import { ToolsService } from '../../../services/tools.service';


@Component({
  selector: 'app-add-edit-experiment',
  templateUrl: './add-edit-experiment.component.html',
  styleUrls: ['./add-edit-experiment.component.css']
})
export class AddEditExperimentComponent extends ValidationComponent{


  private experimentService = inject(ExperimentsService);
  private userService = inject(AdminUserService);
  private toolService = inject(ToolsService);


  private  pressedAdd = new  BehaviorSubject<boolean>(false);

  public experiment: Experiment = {};
  public users: User[] = [];
  public filteredUsers: User[] = [];
  public tools: Tool[] =[];
  public filteredTools: Tool[] = [];

  override async ngOnInit() {
    this.users = await this.userService.getUsers();
    this.filteredUsers = this.users.filter(user => user);

    this.tools = await this.toolService.getTools();
    this.filteredTools = this.tools.filter(tool => tool);

    this.experimentService.selectedExperiment.subscribe(res => {
      if(res)
        this.experiment = res;
      })

    this.subscriptions.push(this.pressedAdd.subscribe((pressed)=>{
      if(pressed){
          this.setAllControlsDirty(true)
      }
  }))

  }

  onCancel() {
    this.moveBack();
  }

  override validate(): void {
      super.validate();
   // console.log('this.inputsToValidate',this.inputsToValidate);

      if(!this.experiment.number || this.experiment.number?.length == 0)
      {
        this.validationErrors.number = "Введите номер испытания";
      }

      if(!this.experiment.name || this.experiment.name?.length == 0)
      {
        this.validationErrors.name = "Введите название испытания";
      }

      if(!this.experiment.user)
      {
        this.validationErrors.user = "Введите лаборанта";
      }

      if(!this.experiment.tool)
      {
        this.validationErrors.tool = "Укажите используемое оборудование";
      }

      if(!this.experiment.date)
      {
        this.validationErrors.date = "Укажите дату проведения испытания";
      }

  }

  async onCreateEdit(){
    let result;
    this.validate();
    this.pressedAdd.next(true);
    if(this.areThereAnyValidationErrors()) return;
    if(this.experiment.id)
      result = await this.experimentService.editExperiment(Number.parseInt(this.experiment.id), this.experiment);
    else
      result = await this.experimentService.createExperiment(this.experiment);

    if(result.id)
      this.moveBack();

  }

  private moveBack(){
    this.router.navigateByUrl('/experiments');
  }

  searchUser($event: any) {
    this.filteredUsers = this.users.filter(user => user.fio!.toLocaleUpperCase().indexOf($event.query.toLocaleUpperCase()) != -1 );
  }

  searchTool($event: any) {
    this.filteredTools = this.tools.filter(tool => tool.name!.toLocaleUpperCase().indexOf($event.query.toLocaleUpperCase()) != -1 );
  }

}
