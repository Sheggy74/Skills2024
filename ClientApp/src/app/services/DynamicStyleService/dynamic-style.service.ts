import { Injectable, PACKAGE_ROOT_URL } from '@angular/core';
import { __runInitializers } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class DynamicStyleService {

  rootDiv: HTMLElement | undefined;
  constructor() {

  }
  initialize(div:HTMLElement){
    this.rootDiv = div;
  }
}
