import { Component, inject } from "@angular/core";
import { ThemeService } from "src/app/services/ThemeService/theme.service";
import { BaseComponent } from "src/app/system-components/base-component/base.component";

@Component({
  selector: 'app-theme-picker-menu',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent extends BaseComponent{
    public themes: string[] = []
    public selectedTheme: string = ''
    private themeService: ThemeService = inject(ThemeService)

    constructor(){
      super()
      this.themes = this.themeService.getThemes()
      let savedTheme = localStorage.getItem('theme')
      this.selectedTheme = savedTheme ?? this.themes[0]
      this.themeService.changeTheme(this.selectedTheme)
    }

    public onThemeChange($event: any){

        this.themeService.changeTheme($event)
        this.selectedTheme = $event
    }
}
