import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { AppState } from '../../../../core/state/app.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../../core/services/api/auth.api.service';
import {
  isLoadingAuthState,
  isSuccess,
  selectCurrentUser,
  selectResetPasswordError,
} from '../../../../core/state/auth/auth.selectors';
import { Subscription } from 'rxjs';
import {
  loadCurrentUser,
  resetPassword,
} from '../../../../core/state/auth/auth.actions';
import { securePasswordRegex } from '../../../../core/utils/regex.constants';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    PasswordModule,
    RouterModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  @Input()
  private secret?: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authService: AuthService
  ) {}

  resetPasswordForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(securePasswordRegex)]],
  });

  isLoading = this.store.select(isLoadingAuthState);

  private errorSubscription?: Subscription;
  private userSubscription?: Subscription;
  private successSubscription?: Subscription;

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.successSubscription?.unsubscribe();
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
      .select(selectResetPasswordError)
      .subscribe((error) => {
        if (error != null) {
          this.messageService.add({
            severity: 'error',
            summary: this.translateService.instant('auth.reset-password.error'),
            detail: this.translateService.instant(
              'auth.reset-password.wrong_hash'
            ),
          });
        }
      });

    this.successSubscription = this.store
      .select(isSuccess)
      .subscribe((isSuccess) => {
        if (isSuccess != null && isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: this.translateService.instant(
              'auth.reset-password.success'
            ),
            detail: this.translateService.instant(
              'auth.reset-password.success_message'
            ),
          });
          this.router.navigate(['/auth']);
        }
      });
  }

  resetPassword() {
    if (this.secret) {
      const newPassword = this.resetPasswordForm.get('password')?.value!;
      this.store.dispatch(
        resetPassword({ newPassword: newPassword, hash: this.secret })
      );
    }
  }
}
