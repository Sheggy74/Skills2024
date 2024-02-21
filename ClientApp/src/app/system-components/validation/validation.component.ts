import { Component, ElementRef, EventEmitter, Output, QueryList, ViewChildren } from '@angular/core';
import { Dropdown } from 'primeng/dropdown';
import { BehaviorSubject, debounce, interval } from 'rxjs';
import { BaseComponent } from '../base-component/base.component';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent extends BaseComponent{

    @ViewChildren("validate") inputsToValidate : QueryList<any> | undefined
    @Output() validationStateChanged : EventEmitter<boolean> = new EventEmitter() 

    validationErrors : any = {}

    validationInputValueChanged = new BehaviorSubject<any>(undefined)

    override ngOnInit(){
        super.ngOnInit()

        // Подписка на изменение значений
        this.subscriptions.push(this.validationInputValueChanged.pipe(
            debounce((v)=>interval(250))
        ).subscribe((nativeElement)=>{
            setTimeout(()=>{
                this.validationStateChanged.emit(true)
            })
            this.validate()
            this.updateAllControlStates()
        }))
        this.subscriptions.push(this.validationInputValueChanged.subscribe((input)=>{
            if(input instanceof HTMLElement){
                input?.classList.add('ng-dirty')
            }
        }))
        setTimeout(() => {
            this.setupCallbacks()
        });
    
    }
    setupCallbacks(){
        if(this.inputsToValidate == null){
            return
        }
        this.inputsToValidate.forEach((input)=>{
            this.setupOnChangeHandlingForElement(input)
        })        
    }
    setupOnChangeHandlingForElement(input: any) {
        if(input instanceof ElementRef){
            input.nativeElement.onkeydown = ()=>this.validationInputValueChanged.next(input.nativeElement)
        }
        if(input instanceof Dropdown){
            this.subscriptions.push(input.onChange.subscribe((value)=>{
                this.validationInputValueChanged.next(input.el.nativeElement)
            }))
        }
    }
    areThereAnyValidationErrors() : boolean{
        for (let value in this.validationErrors){
            return true
        }
        return false
    }
    shouldShowError(id : string) : boolean{
        if(this.inputsToValidate == null){
            return false
        }
        let returnValue = false
        for(let i = 0; i< this.inputsToValidate?.length; i++){
            let input = this.inputsToValidate?.get(i)
            let nativeElement = this.getNativeElement(input)
            if(nativeElement == null){
                continue
            }
            if(nativeElement.id == id && nativeElement.classList.contains("ng-dirty") && nativeElement.classList.contains("ng-invalid")){
                returnValue = true
            }
        }
        return returnValue
    }
    updateAllControlStates(){
        this.inputsToValidate?.forEach((input)=>{
            let nativeElement = this.getNativeElement(input)
            if(nativeElement != null){
                this.updateControlState(nativeElement)                
            }
        })
    }
    updateControlState(input : HTMLElement){
        let cond1 = input.classList.contains("ng-dirty")
        let cond2 = this.validationErrors[input.id] != null
        if(cond2 && cond1){
            
            input.classList.remove("ng-valid")
            input.classList.add("ng-invalid")
        }
        if(cond2 == false){
            input.classList.remove("ng-invalid")
            input.classList.add("ng-valid")
        }
        return cond1 && cond2
    }
    setAllControlsDirty(dirty: boolean){
        if(this.inputsToValidate == null){
            return
        }
        if(dirty){
            this.inputsToValidate.forEach((input)=>{
                let nativeElement = this.getNativeElement(input)
                if(nativeElement != null){
                    nativeElement.classList.add("ng-dirty")
                }
            })
        }
        else{
            this.inputsToValidate.forEach((input)=>{
                let nativeElement = this.getNativeElement(input)
                if(nativeElement != null){
                    nativeElement.classList.remove("ng-dirty")
                }
            })
        }

        this.validate()
        this.updateAllControlStates()
    }

    resetValidationState(){
        this.validationErrors = {}
        if(this.inputsToValidate == null){
            return
        }
        this.inputsToValidate.forEach((input)=>{
            let nativeElement = this.getNativeElement(input)
            if(nativeElement != null){
                nativeElement.classList.remove("ng-dirty")
                nativeElement.classList.remove("ng-invalid")
            }
           
        })
    }

    // to custom override
    validate(){
        this.validationErrors = {}
    }
    getNativeElement(input : any) : HTMLElement | undefined{
        if(input instanceof ElementRef){
            return input.nativeElement
        }
        if(input instanceof Dropdown){
            return input.el.nativeElement
        }
        return undefined
    }
}
