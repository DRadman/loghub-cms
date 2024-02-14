import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { Subscription, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AppState } from '../../../../core/state/app.state';
import {
  authenticate,
  loadCurrentUser
} from '../../../../core/state/auth/auth.actions';
import {
  isLoadingAuthState,
  selectAuthorizationError,
  selectCurrentUser,
} from '../../../../core/state/auth/auth.selectors';
import { AuthService } from '../../../../core/services/api/auth.api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    InputMaskModule,
    InputTextModule,
    PasswordModule,
    RouterModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('username') usernameInput!: ElementRef;
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authService: AuthService,
  ) {}

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = this.store.select(isLoadingAuthState);
  isUsernameTaken: boolean | null = null;

  private userSubscription?: Subscription;
  private errorSubscription?: Subscription;
  private usernameCheckSubscription?: Subscription;

  ngAfterViewInit(): void {
    fromEvent<any>(this.usernameInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(data => this.checkUsername(data));
  }

  ngOnInit() {
    this.store.dispatch(loadCurrentUser());

    this.userSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user) => {
        if (user != null) {
          this.router.navigate(['/home']);
        }
      });

    this.errorSubscription = this.store
      .select(selectAuthorizationError)
      .subscribe((error) => {
        if (error != null) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant(
              'auth.login.authorization_error'
            ),
            detail: this.translateService.instant(
              'auth.login.wrong_username_or_password'
            ),
          });
        }
      });
  }

  login() {
    this.store.dispatch(
      authenticate({
        username: this.loginForm.get('username')?.value!,
        password: this.loginForm.get('password')?.value!,
      })
    );
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
    this.usernameCheckSubscription?.unsubscribe();
  }

  getApplicationName() {
    return environment.appName;
  }

  isRegistrationEnabled() {
    return environment.enableRegistration;
  }

  private checkUsername(username: string) {
    this.usernameCheckSubscription?.unsubscribe();
    this.usernameCheckSubscription = this.authService.isUsernameTaken(username).subscribe({
      next: (result) => {
        this.isUsernameTaken = result;
      },
      error: () => {
        this.isUsernameTaken = null;
      }
    })
  }
}
