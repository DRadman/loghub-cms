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
        // {
        //   label: sidenav.Home,
        //   icon: 'pi pi-fw pi-home',
        //   routerLink: ['/home'],
        // },
        {
          label: sidenav.Projects,
          icon: 'pi pi-fw pi-code',
          routerLink: ['/home/projects'],
        },
        {
          label: sidenav.Logs,
          icon: 'pi pi-fw pi-list',
          routerLink: ['/home/logs'],
        },
        {
          label: sidenav.Issues,
          icon: 'pi pi-fw pi-inbox',
          routerLink: ['/home/issues'],
        },
        {
          label: sidenav.Messages,
          icon: 'pi pi-fw pi-envelope',
          routerLink: ['/home/messages'],
        },
        {
          label: sidenav.Devices,
          icon: 'pi pi-fw pi-mobile',
          routerLink: ['/home/devices'],
        },
        {
          label: sidenav.Sessions,
          icon: 'pi pi-fw pi-clock',
          routerLink: ['/home/sessions'],
        },
        {
          label: sidenav.Performance,
          icon: 'pi pi-fw pi-chart-line',
          routerLink: ['/home/performance'],
          expanded: true,
          items: [
            {
              label: sidenav.Queries,
              icon: 'pi pi-fw pi-database',
              routerLink: ['/home/queries'],
            },
            {
              label: sidenav.Vitals,
              icon: 'pi pi-fw pi-heart',
              routerLink: ['/home/vitals'],
            },
            {
              label: sidenav.Screen_Loads,
              icon: 'pi pi-fw pi-stopwatch',
              routerLink: ['/home/screen-loads'],
            },
            {
              label: sidenav.Resources,
              icon: 'pi pi-fw pi-server',
              routerLink: ['/home/resources'],
            },
          ],
        },
        {
          label: sidenav.Replays,
          icon: 'pi pi-fw pi-play',
          routerLink: ['/home/replays'],
        },
        {
          label: sidenav.Releases,
          icon: 'pi pi-fw pi-box',
          routerLink: ['/home/releases'],
        },
        {
          label: sidenav.Stats,
          icon: 'pi pi-fw pi-chart-bar',
          routerLink: ['/home/stats'],
        },
      ],
    });
    this.model.push({
      label: sidenav.Settings,
      routerLink: ['/home/settings'],
      items: [
        {
          label: sidenav.Settings_Account,
          icon: 'pi pi-fw pi-user',
          expanded: false,
          routerLink: ['/home/settings/account'],
          items: [
            {
              label: sidenav.Settings_Account_Details,
              routerLink: ['/home/settings/account/details'],
              icon: 'pi pi-fw pi-list'
            },
            {
              label: sidenav.Settings_Account_Security,
              routerLink: ['/home/settings/account/security'],
              icon: 'pi pi-fw pi-shield'
            },
            {
              label: sidenav.Settings_Account_Notifications,
              routerLink: ['/home/settings/account/notifications'],
              icon: 'pi pi-fw pi-envelope'
            },
            {
              label: sidenav.Settings_Account_Close,
              routerLink: ['/home/settings/account/close'],
              icon: 'pi pi-fw pi-exclamation-circle'
            }
          ]
        },
        {
          label: sidenav.Settings_Organization,
          icon: 'pi pi-fw pi-building',
          routerLink: ['/home/settings/organization']
        },
        {
          label: sidenav.Settings_Projects,
          icon: 'pi pi-fw pi-box',
          routerLink: ['/home/settings/projects']
        },
        {
          label: sidenav.Settings_Teams,
          icon: 'pi pi-fw pi-sitemap',
          routerLink: ['/home/settings/teams']
        },
        {
          label: sidenav.Settings_Members,
          icon: 'pi pi-fw pi-users',
          routerLink: ['/home/settings/members']
        },
        {
          label: sidenav.Settings_Alerts,
          icon: 'pi pi-fw pi-bell',
          routerLink: ['/home/settings/alerts']
        }
      ]
    })
    this.model.push({
      label: sidenav.Help,
      items: [
        {
          label: sidenav.Help_Documentation,
          icon: 'pi pi-fw pi-book',
          routerLink: ['/home/help/documentation']
        },
        {
          label: sidenav.Help_SDKS,
          icon: 'pi pi-fw pi-wrench',
          routerLink: ['/home/help/sdks']
        },
        {
          label: sidenav.Help_Guides,
          icon: 'pi pi-fw pi-question-circle',
          routerLink: ['/home/help/guides']
        },
        {
          label: sidenav.Help_Support,
          icon: 'pi pi-fw pi-ticket',
          routerLink: ['/home/help/support']
        },
      ]
    })
  }
}
