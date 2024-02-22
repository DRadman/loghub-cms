import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { environment } from '../../../../../environments/environment';
import { LayoutService } from '../../../../core/services/layout.service';
import { AppState } from '../../../../core/state/app.state';
import { signOut } from '../../../../core/state/auth/auth.actions';
import { selectCurrentUser } from '../../../../core/state/auth/auth.selectors';
import { selectCurrentOrganization } from '../../../../core/state/organization/organization.selectors';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    AvatarModule,
    TranslateModule,
    ButtonModule,
    RippleModule,
    FormsModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private store: Store<AppState>,
    private translateService: TranslateService,
  ) {
    this.selectedLanguage = this.languages[0];
  }

  items: MenuItem[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  languages: any[] = [{ flag: 'gb', label: 'English', value: 'en' }];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedLanguage: any;

  organization = this.store.select(selectCurrentOrganization);
  user = this.store.select(selectCurrentUser);

  logout() {
    this.store.dispatch(signOut());
    this.router.navigate(['/auth']);
  }

  goToProfilePage() {
    this.router.navigate(['/home/settings/account']);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  changeLanguage(language: any) {
    this.translateService.use(language.value);
  }

  getAppName() {
    return environment.appName;
  }
}
