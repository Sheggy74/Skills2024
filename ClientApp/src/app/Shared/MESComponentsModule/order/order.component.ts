import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { OverlayPanel } from 'primeng/overlaypanel';
import { BaseComponent } from 'src/app/system-components/base-component/base.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css']
})
export class OrderComponent extends BaseComponent {
    isOpen: boolean = false
    @ViewChild("overlayPanel") overlayPanel: OverlayPanel | undefined
    @Input() orderItems: OrderItem[] = []

    @Input() selectedOrderItem: OrderItem = {}
    @Output() selectedOrderItemChange = new EventEmitter<OrderItem>()

    @Input() isDescending = false
    @Output() isDescendingChange = new EventEmitter<Boolean>()

    @Output() orderChanged = new EventEmitter<OrderChangedDTO>()

    override ngOnInit() {
        super.ngOnInit()
        setTimeout(() => {
            if (this.overlayPanel == null) {
                return
            }
            this.subscriptions.push(this.overlayPanel.onHide.subscribe(() => {
                this.isOpen = false
            }))
            this.subscriptions.push(this.isDescendingChange.subscribe(()=>{
                this.sendOrderChanged()
            }))
            this.subscriptions.push(this.selectedOrderItemChange.subscribe(()=>{
                this.sendOrderChanged()
            }))
        })

        // Если от родительского компонента приходит уже выбранный элемент, отправить уведомление
        setTimeout(()=>
        {
            this.orderItems.forEach((item)=>{
                if(item.isSelected){
                    this.selectItem(item)
                }
            })   
        })
    }
    selectItem(item: OrderItem) {
        this.orderItems.forEach((value) => {
            if (value == item) {
                value.isSelected = true
                this.selectedOrderItem = value
                this.selectedOrderItemChange.emit(value)
            }
            else {
                value.isSelected = false
            }
        })
    }
    changeIsDescending(value : boolean){
        this.isDescending = value
        this.isDescendingChange.emit(value)
    }
    sendOrderChanged(){
        this.orderChanged.emit({
            isDescending: this.isDescending,
            selectedOrderItem: this.selectedOrderItem
        })
    }
    static getDataByPath(value : any, path : string[]) : any{
        let valueToReturn : any = value
        if(path.length == 0){
            return null
        }
        for(let i = 0; i<path.length; i++){
            if(valueToReturn == null){
                return null;
            }
            valueToReturn = valueToReturn[path[i]]
        }
        return valueToReturn
    }
    static orderFunction(dto : OrderChangedDTO){
        return (a: any, b: any) => {
            let defaultValue = dto.isDescending ? 1 : -1
            if (dto.selectedOrderItem == null || dto.selectedOrderItem.key == null) {
                return 0
            }
            let selectedKey = dto.selectedOrderItem.key
            // null handling
            var aValue = this.getDataByPath(a, selectedKey)
            var bValue =  this.getDataByPath(b, selectedKey)
            if(aValue == null){
                aValue = ''
            }
            if(bValue == null){
                bValue = ''
            }

            if (aValue > bValue) {
                return -1 * defaultValue
            }
            if (aValue < bValue) {
                return 1 * defaultValue
            }
            return 0
        }
   }
   static orderFunctionForTree(dto : OrderChangedDTO){
    return (a: TreeNode<any>, b: TreeNode<any>) => {
        let defaultValue = dto.isDescending ? 1 : -1
        if (dto.selectedOrderItem == null || dto.selectedOrderItem.key == null) {
            return 0
        }
        let selectedKey = dto.selectedOrderItem.key
        // null handling
        var aValue = this.getDataByPath(a, selectedKey)
        var bValue =  this.getDataByPath(b, selectedKey)
        if(aValue == null){
            aValue = ''
        }
        if(bValue == null){
            bValue = ''
        }

        if (aValue > bValue) {
            return -1 * defaultValue
        }
        if (aValue < bValue) {
            return 1 * defaultValue
        }
        return 0
    }
   
}

}
export interface OrderChangedDTO{
    selectedOrderItem? : OrderItem
    isDescending? : boolean
}
export interface OrderItem {
    caption?: string
    key?: string[]
    isSelected?: boolean
}
