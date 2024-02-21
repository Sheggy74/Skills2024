import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoundButtonComponent } from './round-button/round-button.component';
import { ExpanderComponent } from './expander/expander.component';
import { GrayButtonComponent } from './gray-button/gray-button.component';
import { ImageComponent } from './image/image.component';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { ChipComponent } from './chip/chip.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { OrderComponent } from './order/order.component';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { MainButtonComponent } from './main-button/main-button.component';
import { TextBusyIndicatorComponent } from './text-busy-indicator/text-busy-indicator.component';



@NgModule({
  declarations: [
    RoundButtonComponent,
    ExpanderComponent,
    GrayButtonComponent,
    ImageComponent, 
    FileSelectorComponent, 
    ToggleButtonComponent, 
    ChipComponent, 
    SearchInputComponent,
    OrderComponent,
    IconButtonComponent,
    MainButtonComponent,
    TextBusyIndicatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    OverlayPanelModule,
    DividerModule
  ], 
  exports:[
    RoundButtonComponent,
    ExpanderComponent, 
    GrayButtonComponent,
    ImageComponent,
    FileSelectorComponent,
    ToggleButtonComponent,
    ChipComponent,
    SearchInputComponent,
    OrderComponent,
    IconButtonComponent,
    MainButtonComponent,
    OverlayPanelModule,
    TextBusyIndicatorComponent
  ]
})
export class MesComponentsModule { }
