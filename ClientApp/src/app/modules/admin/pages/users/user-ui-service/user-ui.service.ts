import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';

@Injectable({
  providedIn: 'root'
})
export class UserUiService {

    selectedUser = new BehaviorSubject<User|undefined>(undefined)
    users = new BehaviorSubject<User[]>([])
    roles = new BehaviorSubject<Role[]>([])

    constructor() { }
}
