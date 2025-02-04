import { HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
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

  isLoading: boolean = false

  getUsers(): Promise<User[]> {
    this.isLoading = true;
    var retValue = lastValueFrom(this.http.get<User[]>(this.localAPIPath)
      .pipe(
        map((user: any) => {
          return user.data.map((user: any) => {
            this.isLoading = false;
            return {
              ...user,
              fio: user.lastName + ' ' + user.firstName + ' ' + user.secondName
            }
          });
        }),
        catchError(this.exceptionService.getErrorHandlerList())));

    return retValue;
  }

  async getUsersTree(){
    let users = await this.getUsers();
    return this.buildTree(users);
  }

  buildTree(users: any[]): any[] {
    const map = new Map<number, any>();
  const tree: any[] = [];

  // Создаем карту для быстрого доступа к каждому пользователю по его id
  users.forEach(user => {
    map.set(user.id, { data: { ...user }, children: [] });
  });

  // Строим дерево
  users.forEach(user => {
    if (user.bossId === null) {
      // Если bossId равен null, это корневой элемент
      tree.push(map.get(user.id));
    } else {
      // Иначе добавляем пользователя как дочерний элемент своего начальника
      const parent = map.get(user.bossId);
      if (parent) {
        parent.children.push(map.get(user.id));
      }
    }
  });
   console.log(tree);
   
  return tree;
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

  setUserOnProject(user_id: number, project_id: number, name: string = ''): Promise<boolean> {
    
    let retValue = lastValueFrom(this.http.post<any>(this.apiURL + '/projects/setUserOnProject', { project_id: project_id, user_id: user_id, name: name })
      .pipe(
        map((response: any) => {

          return true;
        }),
        catchError(this.exceptionService.getErrorHandlerList())
      )
    );
    return (retValue as Promise<boolean>);
  }

  uploadUsers(userFile: File){
    let formData = new FormData();
    formData.append('file', userFile);

    let retValue = lastValueFrom(this.http.post<any>(this.apiURL + '/admin/uploadUsers', formData)
      .pipe(
        map((response: any) => {
          return true;
        }),
        catchError(this.exceptionService.getErrorHandlerList())
      )
    );
    return (retValue as Promise<boolean>);
  }

  setAdd(user_id: number, can_add: boolean){
    return lastValueFrom(
      this.http.put(this.apiURL + '/admin/set-add',{
        user_id: user_id,
        can_add: can_add
      })
    )
  }
}
