import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
  private currentThemeLinkId = 'app-theme';
  private themes: string[] = [];

  constructor(){
    this.themes = [
      'arya-blue',
      'arya-green',
      'arya-orange',
      'arya-purple',
      'fluent-light',
      'lara-dark-blue',
      'lara-dark-indigo',
      'lara-dark-teal',
      'lara-light-blue',
      'lara-light-indigo',
      'lara-light-teal',
      'luna-pink',
      'md-dark-deeppurple',
      'md-light-indigo',
      'nova',
      'nano',
      'rhea',
      'saga-blue',
      'soho-dark',
      'soho-light',
      'vela-orange'
    ]
  }

  public changeTheme(theme: string): void {
    let themeLink = document.getElementById(this.currentThemeLinkId) as HTMLLinkElement;

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = this.currentThemeLinkId;
      document.head.appendChild(themeLink);
    }

    themeLink.href = `/assets/themes/${theme}/theme.css`;
  }

  public getThemes() : string[]
  {
    return this.themes;
  }
}
