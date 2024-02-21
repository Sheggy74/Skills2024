import { ImageService } from 'src/app/services/ImageService/image.service'
import { ImageComponent } from './image.component'

describe('ImageComponent', () => {
    let uuid = crypto.randomUUID()

    it('should mount', () => {
        cy.mount(ImageComponent)
    })

    it('should get an image', () => {
        /* {
            statusCode: 200,
            body:{
                name:"asdf"
            }
        } */
        cy.intercept("**/default/image/" + uuid + "?low_quality=true").as("interceptor");
        cy.intercept("**/asdf").as("interceptor2");
        //Пока непонятно как делать mock запросы - перехватчики не работают
        /* cy.mount(ImageComponent, {
            componentProperties: {
                id: uuid
            },
            declarations:[ImageComponent]
        }).then((component)=>{
            component.component.loadImage()
            
            
        })
        

        cy.wait("@interceptor2") */
    })
})