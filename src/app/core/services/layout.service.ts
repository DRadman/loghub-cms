import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorage } from './local-storage.service';

/** The above code is defining an interface named `AppConfig` in TypeScript. This interface has several
properties such as `inputStyle`, `colorScheme`, `theme`, `ripple`, `menuMode`, and `scale`. These
properties represent various configuration options for a layout and are used in various functions of
the `LayoutService` class to determine the current configuration of the layout and apply appropriate
styles. The comments above each property provide a description of what that property represents and
how it is used. */
export interface AppConfig {
  /** `inputStyle: string;` is declaring a property named `inputStyle` of type `string` in the
  `AppConfig` interface. This property represents the style of the input elements in the layout and
  can have values such as `'outlined'` or `'filled'`. It is used in various functions of the
  `LayoutService` class to determine the current input style of the layout and apply appropriate
  styles. */
  inputStyle: string;
  /** `colorScheme: string;` is declaring a property named `colorScheme` of type `string` in the
  `AppConfig` interface. This property represents the color scheme of the layout and can have values
  such as `'light'` or `'dark'`. It is used in various functions of the `LayoutService` class to
  determine the current color scheme of the layout and apply appropriate styles. */
  colorScheme: string;
  /** `theme: string;` is declaring a property named `theme` of type `string` in the `AppConfig`
  interface. This property represents the theme of the layout and can have values such as
  `'lara-light-blue'`, `'lara-dark-blue'`, or `'lara-green'`. It is used in various functions of the
  `LayoutService` class to determine the current theme of the layout and apply appropriate styles. */
  theme: string;
  /** The `ripple: boolean;` property in the `AppConfig` interface represents a configuration option for
  whether or not to enable ripple effects on UI elements. If `ripple` is set to `true`, then UI
  elements such as buttons and links will have a ripple effect when clicked. If `ripple` is set to
  `false`, then no ripple effect will be applied. */
  ripple: boolean;
  /** `menuMode: string;` is declaring a property named `menuMode` of type `string` in the `AppConfig`
  interface. This property represents the mode of the menu and can have values such as `'static'`,
  `'overlay'`, or `'horizontal'`. It is used in various functions of the `LayoutService` class to
  determine the behavior of the menu based on the selected mode. */
  menuMode: string;
  /** `scale: number;` is declaring a property named `scale` of type `number` in the `AppConfig`
  interface. This property represents the scale of the layout and is used to adjust the size of
  various elements in the layout. The default value of `scale` is set to `14` in the `config` object
  of the `LayoutService` class. */
  scale: number;
}

/** The `interface LayoutState` is defining the shape of an object that represents the state of the
layout. It declares several boolean properties such as `staticMenuDesktopInactive`,
`overlayMenuActive`, `profileSidebarVisible`, `configSidebarVisible`, `staticMenuMobileActive`, and
`menuHoverActive`. These properties are used in various functions of the `LayoutService` class to
toggle the visibility of menus and sidebars and to keep track of the current state of the layout.
The comments above each property provide a description of what the property represents and how it is
used in the code. */
interface LayoutState {
  /** `staticMenuDesktopInactive: boolean;` is declaring a boolean property named
  `staticMenuDesktopInactive` in the `LayoutState` interface. This property represents the state of
  whether the static menu is currently inactive on a desktop device. It is used in the
  `onMenuToggle()` function to toggle the visibility of the static menu and set the state of the
  `staticMenuDesktopInactive` property to `true` when the static menu is hidden. */
  staticMenuDesktopInactive: boolean;
  /** `overlayMenuActive: boolean;` is declaring a boolean property named `overlayMenuActive` in the
  `LayoutState` interface. This property represents the state of whether the overlay menu is
  currently active or not. It is used in the `onMenuToggle()` function to toggle the visibility of
  the overlay menu and set the state of the `overlayMenuActive` property to `true` when the overlay
  menu is shown. It is also used in the `showProfileSidebar()` function to close the overlay menu
  when the profile sidebar is shown. */
  overlayMenuActive: boolean;
  /** `profileSidebarVisible: boolean;` is declaring a boolean property named `profileSidebarVisible` in
  the `LayoutState` interface. This property represents the state of whether the profile sidebar is
  currently visible or not. It is used in the `showProfileSidebar()` function to toggle the
  visibility of the profile sidebar and set the state of the `profileSidebarVisible` property to
  `true` when the profile sidebar is shown. */
  profileSidebarVisible: boolean;
  /** `configSidebarVisible: boolean;` is declaring a boolean property named `configSidebarVisible` in
  the `LayoutState` interface. This property represents the state of whether the configuration
  sidebar is currently visible or not. It is used in the `showConfigSidebar()` function to set the
  state of the `configSidebarVisible` property to `true` when the configuration sidebar is shown. */
  configSidebarVisible: boolean;
  /** `staticMenuMobileActive: boolean;` is declaring a boolean property named `staticMenuMobileActive`
  in the `LayoutState` interface. This property represents the state of whether the static menu is
  currently active on a mobile device. */
  staticMenuMobileActive: boolean;
  /** `menuHoverActive: boolean;` is declaring a boolean property named `menuHoverActive` in the
  `LayoutState` interface. This property represents the state of whether the user is currently
  hovering over the menu. */
  menuHoverActive: boolean;
}

/** The `LayoutService` class in TypeScript defines the default configuration and state of a layout,
provides functions to toggle menu and sidebar visibility, and emits events through observables. */
@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(private localStorage: LocalStorage) {}
  //TODO: Move config to local storage
  /** The `config` property is initializing an object of type `AppConfig` with default values for
  various configuration options. These options include `ripple`, `inputStyle`, `menuMode`,
  `colorScheme`, `theme`, and `scale`. The `=` operator is assigning this object to the `config`
  property of the `LayoutService` class. This object represents the default configuration for the
  layout. */
  config: AppConfig = {
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-blue',
    scale: 14,
  };

  /** `state: LayoutState` is declaring a property named `state` of type `LayoutState`. `LayoutState` is
  an interface that defines the shape of an object with boolean properties
  `staticMenuDesktopInactive`, `overlayMenuActive`, `profileSidebarVisible`, `configSidebarVisible`,
  `staticMenuMobileActive`, and `menuHoverActive`. The `=` operator is initializing the `state`
  property with an object that has all of these boolean properties set to `false`. This object
  represents the initial state of the layout. */
  state: LayoutState = {
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  };

  /** `private configUpdate = new Subject<AppConfig>();` is creating a new instance of the `Subject`
  class from the `rxjs` library and assigning it to the `configUpdate` property of the
  `LayoutService` class. This `Subject` instance is used to emit events when the configuration is
  updated. Other parts of the application can subscribe to these events using the `configUpdate$`
  observable created from this `Subject`. The `AppConfig` type parameter in `Subject<AppConfig>`
  indicates that the `Subject` can emit values of type `AppConfig`. */
  private configUpdate = new Subject<AppConfig>();

  /** `private overlayOpen = new Subject<any>();` is creating a new instance of the `Subject` class from
  the `rxjs` library and assigning it to the `overlayOpen` property of the `LayoutService` class.
  This `Subject` instance is used to emit events when the overlay menu is opened or closed. Other
  parts of the application can subscribe to these events using the `overlayOpen$` observable created
  from this `Subject`. The `any` type parameter in `Subject<any>` indicates that the `Subject` can
  emit values of any type. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private overlayOpen = new Subject<any>();

  /** `configUpdate$` is creating an observable from the `configUpdate` subject. This allows other parts
  of the application to subscribe to changes in the `configUpdate` subject and react accordingly.
  The `$` at the end of the variable name is a convention in RxJS to indicate that the variable is
  an observable. */
  configUpdate$ = this.configUpdate.asObservable();

  /** `overlayOpen$` is creating an observable from the `overlayOpen` subject. This allows other parts
  of the application to subscribe to changes in the `overlayOpen` subject and react accordingly. The
  `$` at the end of the variable name is a convention in RxJS to indicate that the variable is an
  observable. */
  overlayOpen$ = this.overlayOpen.asObservable();

  /**
   * The function toggles the visibility of a menu based on the device type.
   */
  onMenuToggle() {
    if (this.isOverlay()) {
      this.state.overlayMenuActive = !this.state.overlayMenuActive;
      if (this.state.overlayMenuActive) {
        this.overlayOpen.next(null);
      }
    }

    if (this.isDesktop()) {
      this.state.staticMenuDesktopInactive =
        !this.state.staticMenuDesktopInactive;
    } else {
      this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive;

      if (this.state.staticMenuMobileActive) {
        this.overlayOpen.next(null);
      }
    }
  }

  /**
   * The function toggles the visibility of a profile sidebar and opens an overlay if the sidebar is
   * visible.
   */
  showProfileSidebar() {
    this.state.profileSidebarVisible = !this.state.profileSidebarVisible;
    if (this.state.profileSidebarVisible) {
      this.overlayOpen.next(null);
    }
  }

  /**
   * This function sets the state of the configSidebarVisible property to true.
   */
  showConfigSidebar() {
    this.state.configSidebarVisible = true;
  }

  /**
   * This function checks if the menu mode is set to 'overlay'.
   * @returns The function `isOverlay()` is returning a boolean value that indicates whether the
   * `menuMode` property of the object's `config` property is equal to the string `'overlay'`.
   */
  isOverlay() {
    return this.config.menuMode === 'overlay';
  }

  /**
   * This function checks if the current window width is greater than 991 pixels, indicating if the
   * user is on a desktop device.
   * @returns The function `isDesktop()` returns a boolean value `true` if the width of the window is
   * greater than 991 pixels, indicating that the device is a desktop or a tablet in landscape mode.
   * Otherwise, it returns `false`, indicating that the device is a mobile or a tablet in portrait
   * mode.
   */
  isDesktop() {
    return window.innerWidth > 991;
  }

  /**
   * The function checks if the device is not a desktop and returns a boolean value.
   * @returns The `isMobile()` function is returning the opposite of the `isDesktop()` function. It
   * will return `true` if the device is not a desktop and `false` if it is a desktop.
   */
  isMobile() {
    return !this.isDesktop();
  }

  /**
   * The function updates the configuration and emits the updated configuration through a subject.
   */
  onConfigUpdate() {
    this.saveConfig();
    this.configUpdate.next(this.config);
  }

  restoreConfig() {
    const localStorageConfig = this.localStorage.getItem("UI_CONFIG");
    if (localStorageConfig && localStorageConfig != null) {
      this.config = JSON.parse(localStorageConfig);
      this.onConfigUpdate();
    }
  }

  saveConfig() {
    this.localStorage.setItem("UI_CONFIG", JSON.stringify(this.config));
  }
}
