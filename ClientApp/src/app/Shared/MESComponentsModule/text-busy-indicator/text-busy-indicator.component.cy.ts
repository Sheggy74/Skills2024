import { TextBusyIndicatorComponent } from './text-busy-indicator.component'

describe('TextBusyIndicatorComponent', () => {
  it('should mount', () => {
    cy.mount(TextBusyIndicatorComponent)
  })

  it('should diplay isBusy', () => {
    cy.mount(TextBusyIndicatorComponent, {
        componentProperties: {
            isBusy: true,
            caption: 'Ждите'
        }
    })
    
    cy.contains("...")
    cy.contains("..")
    cy.contains(".")
    cy.contains("Ждите")
  })

})