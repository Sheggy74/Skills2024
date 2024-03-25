import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptsService } from '../../services/scripts.service';
import { Script } from 'src/app/Models/Script';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent implements OnInit{


  private router = inject(Router);
  private scriptService = inject(ScriptsService);

  public script?: Script = undefined;

  ngOnInit(): void {
      this.scriptService.selectedScript.subscribe(res => {
        this.script = res;
      })
  }
  onAdd(){
    this.scriptService.selectedScript.next(undefined);
    this.router.navigateByUrl('/scripts/new');
  }



}
