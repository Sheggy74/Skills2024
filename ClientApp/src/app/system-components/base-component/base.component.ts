import { Type } from '@angular/compiler';
import { Component, HostListener, inject, Inject, reflectComponentType } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogService } from '../../services/log/log.service';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.css']
})
/// Компонент обеспечивает ряд базовых задач для дальнейшего использования в других компонентах
///     1. Менеджмент подписок. Для автоматической отписки можно добавить подписку в массив subscriptions
///     2. Отслеживание пользовательских действий. При инициации компонент логгирует в сервис факт создания компонента
export class BaseComponent {
    subscriptions: Subscription[] = [];
    router: Router
    logger = inject(LogService)
    
    constructor() {
        this.router = inject(Router)
        
        this.logger.logAction("created component: " + this.constructor.name)
    }
    ngOnInit() {
        this.createSubscriptions();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(element => {
            element.unsubscribe();
        });
    }
    createSubscriptions() {
    }
    @HostListener("window:beforeunload", ['$event'])
    async beforeUnloadHandler(event : any){
        this.ngOnDestroy()        
        return true
    }
    extractPath(jValue : any, path : string[]) : any{
        if(jValue == null){
            return null
        }
        let currentValue = jValue

        for(let i = 0; i < path.length; i++){
            if(currentValue == null){
                return null
            }
            currentValue = currentValue[path[i]]
        }

        return currentValue
    }
    setPath(jValue : any, path : string[], value : any) : any{
        for(let i = 0; i < path.length; i++){
            if(jValue == null){
                jValue = {}
            }
            jValue = jValue[path[i]]
        }

        return jValue
    }
}
