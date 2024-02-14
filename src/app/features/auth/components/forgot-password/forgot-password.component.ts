import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppState } from '../../../../core/state/app.state';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  isLoadingAuthState,
  isSuccess,
  selectCurrentUser,
  selectForgotPasswordError,
} from '../../../../core/state/auth/auth.selectors';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import {
  forgotPassword,
  loadCurrentUser,
} from '../../../../core/state/auth/auth.actions';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../../../core/services/api/auth.api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  @ViewChild('username') usernameInput!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authService: AuthService
  ) {}

  forgotPasswordForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
  });

  isLoading = this.store.select(isLoadingAuthState);
  isUsernameTaken: boolean | null = null;

  private errorSubscription?: Subscription;
  private userSubscription?: Subscription;
  private successSubscription?: Subscription;
  private usernameCheckSubscription?: Subscription;

  ngAfterViewInit(): void {
    fromEvent<any>(this.usernameInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((data) => this.checkUsername(data));
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
      .select(selectForgotPasswordError)
      .subscribe((error) => {
        if (error != null) {
          if (error.status == 404) {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant(
                'auth.forgot-password.error'
              ),
              detail: this.translateService.instant(
                'auth.forgot-password.user_does_not_exist'
              ),
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant(
                'auth.forgot-password.error'
              ),
              detail: this.translateService.instant(
                'auth.forgot-password.error_description'
              ),
            });
          }
        }
      });

    this.successSubscription = this.store
      .select(isSuccess)
      .subscribe((isSuccess) => {
        if (isSuccess != null && isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant(
              'auth.forgot-password.success'
            ),
            detail: this.translateService.instant(
              'auth.forgot-password.check_your_email'
            ),
          });
        }
      });
  }

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.successSubscription?.unsubscribe();
    this.usernameCheckSubscription?.unsubscribe();
  }

  forgotPassword() {
    this.store.dispatch(
      forgotPassword({
        username: this.forgotPasswordForm.get('username')?.value!,
      })
    );
  }

  private checkUsername(username: string) {
    this.usernameCheckSubscription?.unsubscribe();
    this.usernameCheckSubscription = this.authService
      .isUsernameTaken(username)
      .subscribe({
        next: (result) => {
          this.isUsernameTaken = result;
        },
        error: () => {
          this.isUsernameTaken = null;
        },
      });
  }
}
