import { createOutputSpy } from 'cypress/angular'
import { IconButtonComponent } from './icon-button.component'

describe('IconButtonComponent', () => {
  it('should mount', () => {
    cy.mount(IconButtonComponent)
  })

  it('should output click', ()=>{
    cy.mount(IconButtonComponent, {
        componentProperties:{
            onClick: createOutputSpy("onClick")
        }
    })

    cy.get("button").click()
    cy.get("@onClick").should("have.been.calledOnce")
  })
  it('should not output click if disabled', ()=>{
    cy.mount(IconButtonComponent, {
        componentProperties:{
            disabled: true,
            onClick: createOutputSpy("onClick")
        }
    })

    cy.get("button").click({force: true})

    cy.get("@onClick").should("not.have.been.called")
  })
})