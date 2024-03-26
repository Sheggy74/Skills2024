import { Component, OnInit, Type, inject } from '@angular/core';
import { Experiment } from 'src/app/Models/Experiment';
import { ScriptsService } from '../../../services/scripts.service';
import { AdminUserService } from 'src/app/modules/admin/services/admin-user-service/admin-user.service';
import { User } from 'src/app/Models/User';
import { ValidationComponent } from 'src/app/system-components/validation/validation.component';
import { BehaviorSubject } from 'rxjs';
import { Tool } from 'src/app/Models/Tool';
import { ToolsService } from '../../../services/tools.service';
import { Script } from 'src/app/Models/Script';
import { ToastService } from 'src/app/services/ToastService/toast.service';


@Component({
  selector: 'app-add-script',
  templateUrl: './add-script.component.html',
  styleUrls: ['./add-script.component.css']
})
export class AddScriptComponent extends ValidationComponent{

  private scriptService = inject(ScriptsService);

  typeScript: any[] = [{id:0, name:'SQL'}, {id:1, name:'PHP'}, {id:2, name:'JavaScript'}];
  isOpen = false
  isCreate = false
  title = ''
  user : User = {}
  script: Script = {}
  oldUser : User = {}
  textscript: string = '';

  pressedAdd = new BehaviorSubject<boolean>(false)


  override async ngOnInit() {

    this.script = {};

    this.subscriptions.push(this.pressedAdd.subscribe((pressed)=>{
      if(pressed){
          this.setAllControlsDirty(true)
      }
  }))

  }
  createShow(){
    this.resetControl()
    this.isCreate = true
    this.title = 'Добавить скрипт'
    this.user = {}
}
async create(){
  //check text
  console.log(this.script.scripttype?.id);
  if (this.script.scripttype?.id == 2)
  {
    //проблема с внедрением
    if (this.script.textscript!=undefined)
    {
     let resjs = eval(this.script.textscript);
     this.script.result = resjs;
    }
    else
    {
      //todo error
    }

  }
  let script = await this.scriptService.createScript(this.script);
  if(script.id == null){
    return;
  }

this.scriptService.scripts.value.push(script)
this.scriptService.scripts.next(this.scriptService.scripts.value)
  this.isOpen = false;
}
resetControl(){
  this.pressedAdd.next(false)
  this.resetValidationState()
  this.isOpen = true
}
  onCancel() {
    this.moveBack();
  }

  override validate(): void {
      super.validate();
   // console.log('this.inputsToValidate',this.inputsToValidate);

      if(!this.script.textscript)
      {
        this.validationErrors.number = "Заполните скрипт";
      }


  }


  private moveBack(){
    this.router.navigateByUrl('/scripts');
  }


}
