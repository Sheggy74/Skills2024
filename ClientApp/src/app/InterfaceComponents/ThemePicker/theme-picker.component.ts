import { Component, inject } from "@angular/core";
import { Theme } from "src/app/services/ThemeService/theme";
import { ThemeService } from "src/app/services/ThemeService/theme.service";
import { BaseComponent } from "src/app/system-components/base-component/base.component";

@Component({
  selector: 'app-theme-picker-menu',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.css']
})
export class ThemePickerComponent extends BaseComponent{
    public themes: Theme[] = []
    public selectedTheme: Theme;
    private themeService: ThemeService = inject(ThemeService)

    constructor(){
      super()
      this.themes = this.themeService.getThemes()
      let savedTheme = localStorage.getItem('theme')
      this.selectedTheme = this.themes.find(theme => theme.name == localStorage.getItem('theme')) ?? this.themes[0]
      this.themeService.changeTheme(this.selectedTheme)
    }

    public onThemeChange($event: Theme){
        this.themeService.changeTheme($event)
        this.selectedTheme = $event
        localStorage.setItem('theme',$event.name)
    }
}
