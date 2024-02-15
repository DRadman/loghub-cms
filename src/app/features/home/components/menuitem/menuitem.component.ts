import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutService } from '../../../../core/services/layout.service';
import { MenuService } from '../../../../core/services/menu.service';

/** The `MenuitemComponent` class is used to render a menu item in an Angular application and handle
events such as clicking and updating the active state based on the current route. */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[app-menuitem]',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.scss'],
  standalone: true,
  imports: [TranslateModule, CommonModule, RippleModule, RouterModule],
  animations: [
    trigger('children', [
      state(
        'collapsed',
        style({
          height: '0',
        }),
      ),
      state(
        'expanded',
        style({
          height: '*',
        }),
      ),
      transition(
        'collapsed <=> expanded',
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'),
      ),
    ]),
  ],
})
export class MenuitemComponent implements OnInit, OnDestroy {
  /** `@Input() item: any;` is defining an input property called `item` of type `any`. This input
  property is used to pass a menu item object to the `MenuitemComponent` class. The `item` object
  contains information about the menu item, such as its label, icon, command, and sub-items. By
  defining this input property, the `MenuitemComponent` class can receive the `item` object from its
  parent component and use it to render the menu item in the application menu. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() item: any;

  /** `@Input() index!: number;` is defining an input property called `index` of type `number`. The `!`
  symbol after the `index` variable indicates that it is non-null and initialized in the constructor
  or ngOnInit method. This input property is used to pass the index of the current menu item to the
  `MenuitemComponent` class. The index is used to construct the unique identifier of the menu item
  and to determine the order of the menu items in the menu. */
  @Input() index!: number;

  /** The `@Input() @HostBinding('class.layout-root-menuitem') root!: boolean;` decorator is defining an
  input property called `root` of type `boolean` and also binding the `class.layout-root-menuitem`
  CSS class to the host element of the component. */
  @Input() @HostBinding('class.layout-root-menuitem') root!: boolean;

  /** `@Input() parentKey!: string;` is declaring an input property called `parentKey` of type `string`.
  This input property is used to pass the unique identifier of the parent menu item to the child
  menu items. If a menu item has a parent, its `key` property is set to a value that includes the
  parent key and the index of the item, separated by a hyphen. This allows the `MenuitemComponent`
  class to uniquely identify each menu item in the application menu. The `parentKey` input property
  is used to pass the parent key to the child menu items so that they can construct their own unique
  identifiers based on the parent key and their own index. */
  @Input() parentKey!: string;

  /** `active = false;` is initializing the `active` property of the `MenuitemComponent` class to
  `false`. This property is used to track whether or not a menu item is currently active (i.e.
  selected or expanded). By default, when a new instance of the `MenuitemComponent` class is
  created, no menu item is active, so the `active` property is set to `false`. */
  active = false;

  /** `menuSourceSubscription: Subscription;` is declaring a property called `menuSourceSubscription` of
  type `Subscription`. This property is used to store a subscription to the `menuSource$` observable
  of the `MenuService` class. This subscription is used to update the active state of a menu item
  based on events emitted by the `menuSource$` observable. The `unsubscribe()` method is called on
  this subscription in the `ngOnDestroy()` method to prevent memory leaks. */
  menuSourceSubscription: Subscription;

  /** `menuResetSubscription: Subscription;` is declaring a property called `menuResetSubscription` of
  type `Subscription`. This property is used to store a subscription to the `resetSource$`
  observable of the `MenuService` class. This subscription is used to reset the active state of a
  menu item when the menu is closed or reset. The `unsubscribe()` method is called on this
  subscription in the `ngOnDestroy()` method to prevent memory leaks. */
  menuResetSubscription: Subscription;

  /** `key: string = "";` is declaring a property called `key` with an initial value of an empty string.
  This property is used to uniquely identify each menu item in the application menu. It is set to a
  value that includes the parent key and the index of the item, separated by a hyphen, if the item
  has a parent. Otherwise, it is set to the index of the item as a string. This property is used to
  update the active state of a menu item based on the current route and to toggle the active state
  of a menu item if it has sub-items. */
  key: string = '';

  /**
   * This is a constructor function that subscribes to menu and router events to update the active
   * state of a menu item based on the current route.
   * @param {LayoutService} layoutService - An instance of the LayoutService class, which is likely
   * used to manage the layout of the application.
   * @param {ChangeDetectorRef} cd - The "cd" parameter is an instance of the ChangeDetectorRef class,
   * which is used to manually trigger change detection in Angular. It is typically used when making
   * changes to the component's state that may not be detected by Angular's default change detection
   * mechanism.
   * @param {Router} router - The `router` parameter is an instance of the `Router` service provided by
   * Angular. It is used to handle navigation and routing within the application.
   * @param {MenuService} menuService - The `menuService` parameter is an instance of the `MenuService`
   * class, which is used to manage the application menu. It is injected into the constructor using
   * Angular's dependency injection mechanism.
   */
  constructor(
    public layoutService: LayoutService,
    private cd: ChangeDetectorRef,
    public router: Router,
    private menuService: MenuService,
  ) {
    this.menuSourceSubscription = this.menuService.menuSource$.subscribe(
      (value) => {
        Promise.resolve(null).then(() => {
          if (value.routeEvent) {
            this.active =
              value.key === this.key || value.key.startsWith(this.key + '-')
                ? true
                : false;
          } else {
            if (
              value.key !== this.key &&
              !value.key.startsWith(this.key + '-')
            ) {
              this.active = false;
            }
          }
        });
      },
    );

    this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
      this.active = false;
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.item.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  /**
   * The ngOnInit function sets the key and updates the active state from the route if the item has a
   * routerLink.
   */
  ngOnInit() {
    this.key = this.parentKey
      ? this.parentKey + '-' + this.index
      : String(this.index);

    if (this.item.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  /**
   * This function updates the active state of a menu item based on the current route in a TypeScript
   * application.
   */
  updateActiveStateFromRoute() {
    const activeRoute = this.router.isActive(this.item.routerLink[0], {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });

    if (activeRoute) {
      this.menuService.onMenuStateChange({ key: this.key, routeEvent: true });
    }
  }

  /**
   * This function handles the click event on a menu item, executing its command and toggling its
   * active state if it has sub-items.
   * @param {Event} event - The event parameter is an object that represents the event that triggered
   * the itemClick function. It contains information such as the type of event (e.g. click, hover), the
   * target element that triggered the event, and any additional data related to the event.
   * @returns If the item is disabled, the function will return without executing any further code. If
   * the item is not disabled, the function will execute the command associated with the item (if there
   * is one), toggle the active state if the item has sub-items, and call the `onMenuStateChange`
   * method of the `menuService`. However, the function does not explicitly return any value.
   */
  itemClick(event: Event) {
    // avoid processing disabled items
    if (this.item.disabled) {
      event.preventDefault();
      return;
    }

    // execute command
    if (this.item.command) {
      this.item.command({ originalEvent: event, item: this.item });
    }

    // toggle active state
    if (this.item.items) {
      this.active = !this.active;
    }

    this.menuService.onMenuStateChange({ key: this.key });
  }

  get submenuAnimation() {
    return this.root ? 'expanded' : this.active ? 'expanded' : 'collapsed';
  }

  @HostBinding('class.active-menuitem')
  get activeClass() {
    return this.active && !this.root;
  }

  /**
   * The ngOnDestroy function unsubscribes from two subscriptions if they exist.
   */
  ngOnDestroy() {
    if (this.menuSourceSubscription) {
      this.menuSourceSubscription.unsubscribe();
    }

    if (this.menuResetSubscription) {
      this.menuResetSubscription.unsubscribe();
    }
  }
}
