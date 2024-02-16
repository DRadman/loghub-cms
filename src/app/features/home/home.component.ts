import { CommonModule, DOCUMENT } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Subscription, filter } from 'rxjs';
import { LayoutService } from '../../core/services/layout.service';
import { AppState } from '../../core/state/app.state';
import { loadCurrentUser } from '../../core/state/auth/auth.actions';
import {
  selectCurrentUser,
  selectCurrentUserError,
} from '../../core/state/auth/auth.selectors';
import { ConfigComponent } from './components/config/config.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { loadCurrentOrganization } from '../../core/state/organization/organization.actions';
import { selectOrganizationError } from '../../core/state/organization/organization.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    ConfigComponent,
    FooterComponent,
    BreadcrumbModule,
    TopbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;
  @ViewChild(TopbarComponent) appTopbar!: TopbarComponent;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    public layoutService: LayoutService,
    public renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private translateService: TranslateService,
    private route: ActivatedRoute,
  ) {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            this.document,
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target,
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );

              if (isOutsideClicked) {
                this.hideMenu();
              }
            },
          );
        }

        if (!this.profileMenuOutsideClickListener) {
          this.profileMenuOutsideClickListener = this.renderer.listen(
            this.document,
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appTopbar.menu.nativeElement.isSameNode(event.target) ||
                this.appTopbar.menu.nativeElement.contains(event.target) ||
                this.appTopbar.topbarMenuButton.nativeElement.isSameNode(
                  event.target,
                ) ||
                this.appTopbar.topbarMenuButton.nativeElement.contains(
                  event.target,
                )
              );

              if (isOutsideClicked) {
                this.hideProfileMenu();
              }
            },
          );
        }

        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();

        this.translateService.stream('sidenav').subscribe({
          next: () => {
            this.items = this.createBreadcrumbs(this.route.root) ?? [];
          },
        });
      });
  }

  currentUser = this.store.select(selectCurrentUser);

  home!: MenuItem;
  items!: MenuItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  menuOutsideClickListener: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileMenuOutsideClickListener: any;

  private currentUserErrorSubscription?: Subscription;
  private overlayMenuOpenSubscription: Subscription;
  private organizationErrorSubscription?: Subscription;

  ngOnInit() {
    this.store.dispatch(loadCurrentUser());
    this.store.dispatch(loadCurrentOrganization());

    this.currentUserErrorSubscription = this.store
      .select(selectCurrentUserError)
      .subscribe((error) => {
        if (error && error != null) {
          this.router.navigate(['/auth']);
        }
      });

      this.organizationErrorSubscription = this.store.select(selectOrganizationError).subscribe((error => {
        if (error && error != null) {
          this.router.navigate(['/create-organization']);
        }
      }))

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard' };
  }

  ngOnDestroy() {
    this.currentUserErrorSubscription?.unsubscribe();
    this.organizationErrorSubscription?.unsubscribe();

    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
  /**
   * This function creates breadcrumbs for a given route in a TypeScript application.
   * @param {ActivatedRoute} route - The current activated route in the Angular application.
   * @param {string} [url] - The current URL being constructed for the breadcrumb trail.
   * @param {MenuItem[]} breadcrumbs - `breadcrumbs` is an array of `MenuItem` objects that represent
   * the breadcrumb trail for a given route. Each `MenuItem` object has a `label` property that
   * represents the text to display for the breadcrumb, and a `url` property that represents the URL
   * for the breadcrumb.
   * @returns an array of MenuItem objects, which represent the breadcrumbs for a given route.
   */
  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = [],
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (!(label === null || label === undefined)) {
        const localizedLabel: string = this.translateService.instant(
          'sidenav.' + label,
        );
        if (breadcrumbs.length == 0) {
          breadcrumbs.push({ label: localizedLabel, url });
        } else if (
          breadcrumbs[breadcrumbs.length - 1].label !== localizedLabel
        ) {
          breadcrumbs.push({ label: localizedLabel, url });
        }
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  /**
   * This function hides the menu and resets related layout service states.
   */
  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  /**
   * This function hides the profile sidebar menu and removes the outside click listener.
   */
  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  /**
   * This function adds a class to the body element of a webpage to block scrolling.
   */
  blockBodyScroll(): void {
    if (this.document.body.classList) {
      this.document.body.classList.add('blocked-scroll');
    } else {
      this.document.body.className += ' blocked-scroll';
    }
  }

  /**
   * This function removes the 'blocked-scroll' class from the body element to unblock body scrolling.
   */
  unblockBodyScroll(): void {
    if (this.document.body.classList) {
      this.document.body.classList.remove('blocked-scroll');
    } else {
      this.document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi',
        ),
        ' ',
      );
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple,
    };
  }
}
