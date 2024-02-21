import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { AppComponent } from './app.component';

import { Calendar, CalendarModule } from 'primeng/calendar'
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthorisationComponent } from './starting-components/authorisation/authorisation.component';
import { AppRoutingModule } from './app-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';
import { NavigationWrapperComponent } from './wrappers/navigation-wrapper/navigation-wrapper.component';
import { DefaultWrapperComponent } from './wrappers/default-wrapper/default-wrapper.component'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgileUIService } from './services/AgileUIService/agileUI.service';
import { ConfigService } from './services/ConfigService/config.service';
import { MesComponentsModule } from './Shared/MESComponentsModule/mes-components.module';
import { MesDirectivesModule } from './Shared/MESDirectives/mes-directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { ToastModule } from 'primeng/toast';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigationMenuComponent } from './InterfaceComponents/NavigationMenu/navigation-menu.component';
import { ToolbarComponent } from './InterfaceComponents/Toolbar/toolbar/toolbar.component';
import { AboutComponent } from './InterfaceComponents/about/about.component';
import { MessagesModule } from 'primeng/messages';
import { PickListModule } from 'primeng/picklist';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessageService } from 'primeng/api';
import { NavigationTreeComponent } from './InterfaceComponents/NavigationMenu/NavigationTreeComponent/navigation-tree.component';
import { TreeItemComponent } from './InterfaceComponents/NavigationMenu/NavigationTreeComponent/TreeItemComponent/tree-item.component';
import { LogService } from './services/log/log.service';
import { ValidationComponent } from './system-components/validation/validation.component';
import { AuthInterceptor } from './services/AuthInterceptor/AuthInterceptor';
import { ErrorService } from './services/ErrorService/error.service';
import { RoleSelectionItemComponent } from './InterfaceComponents/role-selection-list/role-selection-item/role-selection-item.component';
import { RoleSelectionListComponent } from './InterfaceComponents/role-selection-list/role-selection-list.component';
import { BlockService } from './services/BlockService/block.service';





@NgModule({
  declarations: [
    AppComponent,
    AuthorisationComponent,
    DefaultWrapperComponent,
    NavigationMenuComponent,
    AboutComponent,
    NavigationTreeComponent,
    TreeItemComponent,
    ValidationComponent,
    NavigationWrapperComponent,
    ToolbarComponent,
    RoleSelectionItemComponent,
    RoleSelectionListComponent,

  ],
  imports: [
    AppRoutingModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule, 
    HttpClientModule,
    DividerModule,
    OverlayPanelModule,
    MesComponentsModule,
    MesDirectivesModule,
    SidebarModule,
    FormsModule,
    BadgeModule,
    InputNumberModule,
    ProgressSpinnerModule,
    TreeModule,
    TooltipModule,
    FontAwesomeModule,
    ToastModule,
    MessagesModule,
    PickListModule,
    InputSwitchModule,
    DialogModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AgileUIService,ConfigService, MessageService, LogService, ErrorService, BlockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
