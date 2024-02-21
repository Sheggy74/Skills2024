import { ToggleButtonComponent } from '../toggle-button/toggle-button.component'
import { ChipComponent } from './chip.component'

describe('ChipComponent', () => {
  it('should mount', () => {
    cy.mount(ChipComponent)
  })
  it("should display label", ()=>{
    cy.mount(ChipComponent, {
        componentProperties: {
            caption: "Test caption"
        }
    })
    cy.contains("Test caption")
  })
  it("should display icon", ()=>{
    cy.mount(ChipComponent, {
        componentProperties: {
            caption: "Test caption",
            icon: "verified"
        }
    })
    cy.contains("Test caption")
    cy.get("span").should("have.class", "material-symbols-outlined").contains("verified")
  })
  it("should be red", ()=>{
    cy.mount(ChipComponent, {
        componentProperties: {
            chipType: "Error",
            caption: "Test caption"
        }
    })
    cy.get('section').should("have.css", "background-color", 'rgb(255, 244, 237)')
    cy.get('p').should("have.css", "color", 'rgb(180, 35, 24)')
  })
})