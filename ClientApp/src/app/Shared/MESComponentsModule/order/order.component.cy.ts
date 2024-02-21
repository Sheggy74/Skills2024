import { createOutputSpy, MountConfig, MountResponse } from 'cypress/angular'
import { toPairs } from 'cypress/types/lodash'
import { DividerModule } from 'primeng/divider'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component'
import { OrderComponent, OrderItem, OrderChangedDTO } from './order.component'

describe('OrderComponent', async () => {
    let orderItems : OrderItem[] = [
        {
            caption: "Test 1 caption",
            isSelected: true,
            key: ["test 1 key", "test 1.1 key"]
        },
        {
            caption: "Test 2 caption",
            isSelected: true,
            key: ["test 2 key", "test 2.1 key"]
        },
    ]
    let config : MountConfig<OrderComponent> = {
        imports: [OverlayPanelModule, DividerModule],
        declarations: [ToggleButtonComponent],
        componentProperties:{
            orderItems: orderItems,
        },
        autoSpyOutputs: true
    }
    

    it('should mount', () => {
        cy.mount(OrderComponent, config)
    })
    it('should display overlay and hide overlay', ()=>{
        cy.mount(OrderComponent, config)

        cy.get("app-toggle-button").click()
        cy.contains("Test 2 caption").click()
        cy.get("app-toggle-button").click()
        cy.contains("Test 2 caption").should("not.exist")
    })
    it('should order correctly', ()=>{
        let valuesToSort : any[]
        cy.fixture("itemsToSort.json").then((result)=>{
            valuesToSort = result
        })

        cy.mount(OrderComponent, config).as("orderComponent")

        cy.get("app-toggle-button").click()
        cy.contains("Test 2 caption").click()
        cy.contains("Test 1 caption").click()
        
        let orderChanged : OrderChangedDTO = {
            isDescending : false,
            selectedOrderItem: orderItems[1]
        }
        cy.get("@orderChangedSpy").should("have.been.calledWith", orderChanged)

        cy.get("@orderComponent").then((orderComponent : any)=>{
            let order = (orderComponent as MountResponse<OrderComponent>).component
            valuesToSort.sort(OrderComponent.orderFunction({
                isDescending: order.isDescending,
                selectedOrderItem: order.selectedOrderItem
            }))
            cy.wrap(valuesToSort[0].value).should("equal", "123")
        })
        cy.contains("По убыванию").click()
        cy.get("@orderComponent").then((orderComponent : any)=>{
            let order = (orderComponent as MountResponse<OrderComponent>).component
            valuesToSort.sort(OrderComponent.orderFunction({
                isDescending: order.isDescending,
                selectedOrderItem: order.selectedOrderItem
            }))
            cy.wrap(valuesToSort[0].value).should("equal", "789")
        })
        cy.contains("Test 2 caption").click()
        cy.get("@orderComponent").then((orderComponent : any)=>{
            let order = (orderComponent as MountResponse<OrderComponent>).component
            valuesToSort.sort(OrderComponent.orderFunction({
                isDescending: order.isDescending,
                selectedOrderItem: order.selectedOrderItem
            }))
            cy.wrap(valuesToSort[0].value).should("equal", "test 3")
        })
    })
})