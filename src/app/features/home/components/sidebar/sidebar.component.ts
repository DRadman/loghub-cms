import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../../../core/services/layout.service';
import { MenuitemComponent } from '../menuitem/menuitem.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MenuitemComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  /** `model: MenuItem[] = [];` is declaring a property called `model` of type `MenuItem[]` (an array of
  `MenuItem` objects) and initializing it to an empty array. This property is likely used to store
  the items that will be displayed in the side navigation menu. */
  model: MenuItem[] = [];
  /**
   * This is a constructor function that takes in several services as parameters.
   * @param {LayoutService} layoutService - It is a service that provides layout-related functionality,
   * such as managing the layout of a web page or application.
   * @param {ElementRef} el - `el` is an instance of the `ElementRef` class, which is a wrapper around
   * a native element inside a View. It is used to access the properties and methods of the native
   * element.
   * @param {TranslateService} translateService - The `translateService` parameter is an instance of
   * the `TranslateService` class, which is used for internationalization and localization of the
   * application. It provides methods for translating text strings into different languages based on
   * the user's language preference.
   * @param {UserStorageService} userService - The `userService` parameter is an instance of the
   * `UserStorageService` class, which is likely used to manage user data and authentication. It is
   * injected into the constructor using Angular's dependency injection system.
   */
  constructor(
    public layoutService: LayoutService,
    public el: ElementRef,
    private translateService: TranslateService,
  ) {}

  /**
   * The ngOnInit function sets up the side navigation based on the user's role.
   */
  ngOnInit() {
    this.translateService.stream('sidenav').subscribe({
      next: (sidenav) => {
        this.model = [];
        this.setupSideNavItems(sidenav);
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private setupSideNavItems(sidenav: any) {
    this.model.push({
      label: sidenav.General,
      items: [
        {
          label: sidenav.Home,
          icon: 'pi pi-fw pi-home',
          routerLink: ['/home'],
        },
      ],
    });
  }
}
