import { createOutputSpy } from 'cypress/angular'
import { ToggleButtonComponent } from './toggle-button.component'

describe('ToggleButtonComponent', () => {
  it('should mount', () => {
    cy.mount(ToggleButtonComponent)
  })

  it('should call click', ()=>{
    cy.mount(ToggleButtonComponent, {
        componentProperties:{
            isCheckedChange: createOutputSpy("checkedChange"),
        },
    })

    cy.get("button").click()
    cy.get("button").click()

    cy.get("@checkedChange").should("have.been.calledWith", true)
    cy.get("@checkedChange").should("have.been.calledWith", false)
  })
  it('should change size', ()=>{
    cy.mount(ToggleButtonComponent)

    cy.get("button").invoke("outerWidth").should("eq", 28)
    cy.get("button").click()
    cy.get("button").invoke("outerWidth").should("be.lt", 28)
    cy.get("button").click()
    cy.get("button").invoke("outerWidth").should("eq", 28)
  })
  
})