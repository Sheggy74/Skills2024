import { User } from "src/app/Models/User";

export class UserHelper{

  getFio(user: User): string{
    return user.lastName + ' ' + user.firstName?.substring(0,1) + '.' + user.secondName?.substring(0,1) + '.';
  }

}
