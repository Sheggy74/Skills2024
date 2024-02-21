import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigationButton } from 'src/app/Models/NavigationButton';

@Injectable({
    providedIn: 'root'
})
export class NavigationStateService {

    selectedButton: BehaviorSubject<NavigationButton> = new BehaviorSubject<NavigationButton>({})
    constructor() { }
}
