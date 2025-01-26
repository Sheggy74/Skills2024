import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom, map } from 'rxjs';
import { NavigationButton } from 'src/app/Models/NavigationButton';
import { Role } from 'src/app/Models/Role';
import { User } from 'src/app/Models/User';
import { BaseApiService } from 'src/app/services/BaseApiService/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService extends BaseApiService {

  localAPIPath = this.apiURL + `/admin/users`

  getUsers(): Promise<User[]> {
    var retValue = lastValueFrom(this.http.get<User[]>(this.localAPIPath)
      .pipe(
        map((user: any) => {
          return user.data.map((user: any) => {
            return {
              ...user,
              fio: user.lastName + ' ' + user.firstName + ' ' + user.secondName
            }
          });
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }
  updateUser(user: User, file: File | undefined = undefined, password: string | undefined = undefined): Promise<User> {

    var formData = {
      'first_name': user.firstName,
      'second_name': user.secondName,
      'last_name': user.lastName,
      'photo_url': user.photoURL,
      'email': user.email,
      'login': user.login,
      'password': password ?? null,
      'job': user.job,
      'place': user.place,
      'phone': user.phone,
      'role': user.role
    }

    var retValue = lastValueFrom(this.http.put<User>(this.localAPIPath + '/' + user.id, formData)
      .pipe(catchError(this.exceptionService.getErrorHandlerSingleObject())));

    return retValue;
  }
  createUser(user: User, file: File | undefined = undefined, password: string | undefined = undefined): Promise<User> {

    var formData = {
      'first_name': user.firstName,
      'second_name': user.secondName,
      'last_name': user.lastName,
      'photo_url': user.photoURL,
      'email': user.email,
      'login': user.login,
      'password': password
    }

    var retValue = lastValueFrom(this.http.post<User>(this.localAPIPath, formData)
      .pipe(catchError(this.exceptionService.getErrorHandlerSingleObject())));

    return retValue;
  }
  deleteUser(id: string): Promise<boolean> {
    var retValue = lastValueFrom(this.http.delete<boolean>(this.localAPIPath + '/' + id)
      .pipe(catchError(this.exceptionService.getErrorHandlerBoolean())));
    return retValue;
  }

  getRoles(): Promise<Role[]> {
    var retValue = lastValueFrom(this.http.get<Role[]>(this.apiURL + '/roles')
      .pipe(
        map((role: any) => {
          return role.map((role: any) => {
            return {
              ...role
            }
          });
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  uploadPhoto(photo: File): Promise<string> {
    let formData = new FormData();
    formData.append('file', photo);

    let retValue = lastValueFrom(this.http.post<any>(this.apiURL + '/admin/photo', formData)
      .pipe(
        map((response: any) => {
          return response.url;
        }),
        catchError(this.exceptionService.getErrorHandlerList())
      )
    );

    return retValue;
  }
}
