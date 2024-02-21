import { HttpClient, HttpHandler } from '@angular/common/http'
import { EventEmitter } from '@angular/core'
import { should } from 'chai'
import { createOutputSpy } from 'cypress/angular'
import { MessageService } from 'primeng/api'
import { LogService } from 'src/app/services/log/log.service'
import { SearchInputComponent } from './search-input.component'

describe('SearchInputComponent', () => {
  it('should mount', () => {
    cy.mount(SearchInputComponent)
  })
  it('should have icon', () => {
    cy.mount(SearchInputComponent)

    cy.get(".material-symbols-outlined").contains("search")
  })
  it('should contain all primeng classes', ()=>{
    cy.mount(SearchInputComponent)

    cy.get("input")
        .should("have.class", "p-inputtext")
        .should("have.class", "p-component")
        .should("have.class", "p-element")
  })
  it('should tell about changes', () => {
    cy.mount("<app-search-input [searchText]='searchText' (searchTextChange)='onClick.emit($event)'></app-search-input>",{
        declarations: [SearchInputComponent],
        componentProperties:{
            searchText:"start text",
            onClick: createOutputSpy("onClickSpy")
        }
    })
    cy.get("input").should("have.value", "start text")

    cy.get("input").type(" test case").should("have.value", "start text test case")
    cy.get("@onClickSpy").should("have.been.calledWith","start text test case")
  })
})