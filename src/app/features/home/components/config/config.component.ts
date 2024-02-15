import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LayoutService } from '../../../../core/services/layout.service';
import { MenuService } from '../../../../core/services/menu.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

/** The ConfigComponent class is a TypeScript class that provides functionality related to the
configuration of an application's layout and menu settings. */
@Component({
  selector: 'app-config',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RippleModule,
    SidebarModule,
    RadioButtonModule,
    TranslateModule,
    InputSwitchModule,
    FormsModule
  ],
  styleUrl: './config.component.scss',
  templateUrl: './config.component.html',
})
export class ConfigComponent {
  /** `@Input() minimal: boolean = false;` is a decorator that marks the `minimal` property as an input
  property, which means that it can be passed as a value from a parent component to this component.
  The `minimal` property is of type `boolean` and is initialized to `false` by default. This
  property can be used in the component's template to conditionally render certain elements or apply
  different styles based on its value. */
  @Input() minimal: boolean = false;

  /** `scales` is an array of numbers that represents the available font sizes that can be applied to
  the HTML document. The default values are `[12, 13, 14, 15, 16]`. These values are used in
  conjunction with the `incrementScale()` and `decrementScale()` methods to adjust the font size of
  the document. */
  scales: number[] = [12, 13, 14, 15, 16];

  /**
   * This is a constructor function that takes two parameters, a LayoutService and a MenuService.
   * @param {LayoutService} layoutService - The layoutService parameter is a dependency injection of
   * a service that provides functionality related to the layout of the application, such as managing
   * the theme, language, and other UI-related settings. It is likely used to control the overall
   * look and feel of the application.
   * @param {MenuService} menuService - The `menuService` parameter is an instance of the
   * `MenuService` class, which is likely used to manage and manipulate the application's menu or
   * navigation system. It may contain methods for adding, removing, or updating menu items, as well
   * as handling user interactions with the menu.
   */
  constructor(
    public layoutService: LayoutService,
    public menuService: MenuService,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  get visible(): boolean {
    return this.layoutService.state.configSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.configSidebarVisible = _val;
  }

  get scale(): number {
    return this.layoutService.config.scale;
  }

  set scale(_val: number) {
    this.layoutService.config.scale = _val;
  }

  get menuMode(): string {
    return this.layoutService.config.menuMode;
  }

  set menuMode(_val: string) {
    this.layoutService.config.menuMode = _val;
  }

  get inputStyle(): string {
    return this.layoutService.config.inputStyle;
  }

  set inputStyle(_val: string) {
    this.layoutService.config.inputStyle = _val;
  }

  get ripple(): boolean {
    return this.layoutService.config.ripple;
  }

  set ripple(_val: boolean) {
    this.layoutService.config.ripple = _val;
  }

  /**
   * This function shows the configuration sidebar when the config button is clicked.
   */
  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  /**
   * This function changes the theme and color scheme of a webpage by replacing the theme link and
   * updating the layout service configuration.
   * @param {string} theme - a string representing the new theme to be applied.
   * @param {string} colorScheme - The `colorScheme` parameter is a string that represents the color
   * scheme to be applied to the theme. It is used in conjunction with the `theme` parameter to
   * update the theme of the application.
   */
  changeTheme(theme: string, colorScheme: string) {
    const themeLink = <HTMLLinkElement>this.document.getElementById('theme-css');
    const newHref = themeLink
      .getAttribute('href')!
      .replace(this.layoutService.config.theme, theme);
    this.layoutService.config.colorScheme;
    this.replaceThemeLink(newHref, () => {
      this.layoutService.config.theme = theme;
      this.layoutService.config.colorScheme = colorScheme;
      this.layoutService.onConfigUpdate();
    });
  }

  /**
   * This function replaces the href attribute of a link element with a new value and removes the
   * original link element once the new one has loaded.
   * @param {string} href - A string representing the URL of the new theme CSS file to be loaded.
   * @param {Function} onComplete - `onComplete` is a callback function that will be executed once
   * the new theme link has been loaded and applied. It is typically used to perform additional
   * actions or update the UI after the theme has been changed.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  replaceThemeLink(href: string, onComplete: Function) {
    const id = 'theme-css';
    const themeLink = <HTMLLinkElement>this.document.getElementById('theme-css');
    const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

    cloneLinkElement.setAttribute('href', href);
    cloneLinkElement.setAttribute('id', id + '-clone');

    themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

    cloneLinkElement.addEventListener('load', () => {
      themeLink.remove();
      cloneLinkElement.setAttribute('id', id);
      onComplete();
    });
  }

  /**
   * This function decrements the scale property and applies the new scale value.
   */
  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  /**
   * The function increments the scale property by 1 and applies the new scale value.
   */
  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  /**
   * This function sets the font size of the HTML document to a specified scale.
   */
  applyScale() {
    this.document.documentElement.style.fontSize = this.scale + 'px';
  }
}
