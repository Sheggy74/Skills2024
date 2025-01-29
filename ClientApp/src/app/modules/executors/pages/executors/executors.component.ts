import { Component, ViewChild, inject } from '@angular/core';
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

  executorsService: ExecutorsService = inject(ExecutorsService)

  searchString: string = '';
  filteredData: User[] = [];

  constructor() {
    super()

  }

  override async ngOnInit(): Promise<void> {
    await this.executorsService.getExecutors()
    this.filteredData = this.executorsService.executors;
  }

  filter() {
    this.filteredData = this.executorsService.executors.filter(
      item => ((item.firstName ?? '') + ' ' + (item.secondName ?? '') + ' ' + (item.lastName ?? '')).toLowerCase().includes(this.searchString.toLowerCase()) ||
        item.job?.toLowerCase().includes(this.searchString.toLowerCase()) ||
        item.place?.toLowerCase().includes(this.searchString.toLowerCase()))
  }

}
