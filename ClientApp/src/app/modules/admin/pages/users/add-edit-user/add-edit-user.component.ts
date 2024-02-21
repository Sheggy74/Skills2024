import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/Models/User';
import { BlockService } from 'src/app/services/BlockService/block.service';
import { ValidationComponent } from 'src/app/system-components/validation/validation.component';
import { AdminUserService } from '../../../services/admin-user-service/admin-user.service';
import { UserUiService } from '../user-ui-service/user-ui.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent extends ValidationComponent{
    userService = inject(AdminUserService)
    userUIService = inject(UserUiService)

    isOpen = false
    isCreate = false
    title = ''
    user : User = {}
    oldUser : User = {}
    photo = new BehaviorSubject<File | undefined>(undefined)
    hasPhotoChanged = false
    photoSrc = ''
    pressedAdd = new BehaviorSubject<boolean>(false)
    password : string = ''
    hasPasswordChanged : boolean = false
    blockService = inject(BlockService)

    override ngOnInit(){
        super.ngOnInit()
        this.subscriptions.push(this.pressedAdd.subscribe((pressed)=>{
            if(pressed){
                this.setAllControlsDirty(true)
            }
        }))
        this.subscriptions.push(this.photo.subscribe((file)=>{
            if(file == null){
                this.photoSrc = ''
                return
            }
            let reader = new FileReader()
            reader.onload = (event)=>{
                let result = event.target?.result?.toString()
                if(result == null){
                    return
                }
                this.photoSrc = result
            } 
            reader.readAsDataURL(file)
        }))
    }
    override validate(){
        super.validate()        

        let loginIndex = this.userUIService.users.value.findIndex((user)=>{
            let matchingCondition = user.login != null && user.login.trim().toLowerCase() == this.user.login?.trim().toLowerCase() &&
                user.login.trim().toLowerCase() != this.oldUser.login?.trim().toLowerCase()
            
            return matchingCondition
        })
        if(this.hasPasswordChanged){
            let numberMatch = this.password.match("(?=.*[0-9])")
            let symbolMatch = this.password.match("(?=.*[!@#$%^&*])")
            let literaMatch = this.password.match("(?=.*[а-я А-Я a-z A-Z])")
            if(this.password.length < 8){
                this.validationErrors.password = "Длина пароля должна быть больше 8 символов"
            }
            else if(numberMatch == null || numberMatch.length == 0){
                this.validationErrors.password = "Должен содержать по крайней мере одну цифру"
            }
            else if(symbolMatch == null || symbolMatch.length == 0){
                this.validationErrors.password = "Должен содержать по крайней мере один спецсимвол"
            }
            else if(literaMatch == null || literaMatch.length == 0){
                this.validationErrors.password = "Должен содержать по крайней мере одну букву"
            }
        }
        if (loginIndex != -1){
            this.validationErrors.login = "Логин занят"
        }
        if(this.user.login == null || this.user.login.length < 3){
            this.validationErrors.login = "Не менее 3 символов"
        }
        if(this.user.firstName == null || this.user.firstName.length < 3){
            this.validationErrors.firstName = "Не менее 3 символов"
        }
        if(this.user.secondName == null || this.user.secondName.length < 3){
            this.validationErrors.secondName = "Не менее 3 символов"
        }
    }
    createShow(){
        this.password = ""
        this.resetControl()
        this.isCreate = true
        this.title = 'Создать пользователя'
        this.user = {}
        this.hasPasswordChanged = true
    }
    resetControl(){
        this.pressedAdd.next(false)
        this.photo.next(undefined)
        this.resetValidationState()
        this.isOpen = true
        this.hasPhotoChanged = false
    }
    editShow(user : User){
        this.password = "substitute"
        this.resetControl()
        this.isCreate = false
        this.title = 'Редактировать пользователя'
        this.user = structuredClone(user)
        this.oldUser = structuredClone(user)
        this.hasPasswordChanged = false
    }
    async createOrEdit(){
        this.validate()
        this.pressedAdd.next(true)
        if(this.areThereAnyValidationErrors()){
            return
        }

        if(this.isCreate){
            let user = await this.userService.createUser(this.user, this.hasPhotoChanged ? this.photo.value : undefined, 
                this.hasPasswordChanged ? this.password : undefined)
    
            if(user.id == null){
                return
            }
    
            this.userUIService.users.value.push(user)
            this.userUIService.users.next(this.userUIService.users.value)
    
            this.isOpen = false
        }
        else{
            if(this.user.id == null){
                return
            }
            let blockResult = await this.blockService.blockObject(this.user.id)
            if(blockResult != ""){
                return
            }
            let user = await this.userService.updateUser(this.user, this.hasPhotoChanged ? this.photo.value : undefined, 
                this.hasPasswordChanged ? this.password : undefined)
    
            let unblockResult = await this.blockService.unblockObject(this.user.id)
            if(user.id == null){
                return
            }
    
            let existingIndex = this.userUIService.users.value.findIndex((value)=>{
                return value.id == user.id
            })

            if(existingIndex == -1){
                return
            }

            this.userUIService.users.value.splice(existingIndex,1)
            this.userUIService.users.value.push(user)
            this.userUIService.users.next(this.userUIService.users.value)
    
            this.isOpen = false
        }
    }
    shouldDisableButton() : boolean{
        return this.pressedAdd.value && this.areThereAnyValidationErrors()
    }
    photoChanged(file : File){
        this.hasPhotoChanged = true
        this.photo.next(file)         
    }
    passwordFocused(){
        if(this.hasPasswordChanged == false){
            this.password = ''
            this.hasPasswordChanged = true
        }
    }
    
}
