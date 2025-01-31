import {NgModule} from '@angular/core';
import {CntxMenuComponent} from './cntx-menu.component';
import { ContextMenuModule } from 'primeng/contextmenu';
@NgModule({
    declarations:[
        CntxMenuComponent,
    ],
    exports:[
        CntxMenuComponent,
    ],
    imports:[
        ContextMenuModule
    ]
})
export class CntxMenuModule{}