import { Injectable } from "@angular/core";
import { Theme } from "./theme";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
  private currentThemeLinkId = 'app-theme';
  private themes: Theme[] = [];

  constructor(){
    this.themes = [
      {
        title: 'Светлая',
        name: 'light'
      },
      {
        title: 'Темная',
        name: 'dark'
      }
    ]
  }

  public changeTheme(theme: Theme): void {
    let themeLink = document.getElementById(this.currentThemeLinkId) as HTMLLinkElement;

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = this.currentThemeLinkId;
      document.head.appendChild(themeLink);
    }

    themeLink.href = `/assets/themes/${theme.name}/theme.css`;
  }

  public getThemes() : Theme[]
  {
    return this.themes;
  }
}
