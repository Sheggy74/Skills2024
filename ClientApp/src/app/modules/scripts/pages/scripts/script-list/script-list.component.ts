import { Component, inject } from '@angular/core';
import { ScriptsService } from '../../../services/scripts.service';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { UserHelper } from 'src/app/helpers/user/user-helper';
import { Script } from 'src/app/Models/Script';


@Component({
  selector: 'app-script-list',
  templateUrl: './script-list.component.html',
  styleUrls: ['./script-list.component.css']
})
export class ScriptListComponent extends BaseComponent{

  scriptService = inject(ScriptsService);

  selectedScript: Script|undefined

  userHelper = new UserHelper;

  isLoading: boolean = true;

  override async ngOnInit(){
      super.ngOnInit();

      this.scriptService.isLoading.subscribe(res => {
        this.isLoading = res;
        console.log(res);

      })
      await this.scriptService.updateData()
      this.scriptService.isLoading.next(false);
  }

}
