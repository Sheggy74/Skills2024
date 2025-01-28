import { Component, inject } from '@angular/core';
import { User } from 'src/app/Models/User';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';
import { ExecutorsService } from '../../services/executors-service.service';

@Component({
  selector: 'app-executors',
  standalone: false,
  templateUrl: './executors.component.html',
  styleUrl: './executors.component.css'
})
export class ExecutorsComponent extends BaseComponent {

  executors: User[] = [];

  executorsService: ExecutorsService = inject(ExecutorsService)

  constructor() {
    super()

  }

  override async ngOnInit(): Promise<void> {
    this.executors = await this.executorsService.getExecutors()
    console.log('executors', this.executors);

  }

}
