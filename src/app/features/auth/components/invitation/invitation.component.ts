import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { RegisterRequestDto } from '../../../../core/domain/dto/requests/register-request.dto';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
} from 'rxjs';
import {
  isLoadingAuthState,
  selectAcceptInvitationError,
  selectCurrentUser,
} from '../../../../core/state/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/state/app.state';
import { AuthService } from '../../../../core/services/api/auth.api.service';
import { securePasswordRegex } from '../../../../core/utils/regex.constants';
import {
  acceptInvitation,
  loadCurrentUser,
} from '../../../../core/state/auth/auth.actions';
import { InvitationService } from '../../../../core/services/api/invitation.api.service';

@Component({
  selector: 'app-invitation',
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
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss',
})
export class InvitationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('username') usernameInput!: ElementRef;
  @Input()
  private invitationHash?: string;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authService: AuthService,
    private invitationService: InvitationService,
  ) {}

  isLoading = this.store.select(isLoadingAuthState);
  isUsernameTaken: boolean | null = null;

  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(securePasswordRegex),
      ],
    ],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
  });

  private userSubscription?: Subscription;
  private errorSubscription?: Subscription;
  private usernameCheckSubscription?: Subscription;

  ngOnInit() {
    this.invitationService.getInvitationDetails(this.invitationHash ?? '').subscribe({
      next: (details) => {
        this.registerForm.get('email')?.setValue(details.email);
      },
      error: () => {
        this.router.navigate(['/auth'])
      }
    })
    this.store.dispatch(loadCurrentUser());

    this.userSubscription = this.store
      .select(selectCurrentUser)
      .subscribe((user) => {
        if (user != null) {
          this.router.navigate(['/home']);
        }
      });

    this.errorSubscription = this.store
      .select(selectAcceptInvitationError)
      .subscribe((error) => {
        if (error != null) {
          if (error.status == 409) {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant(
                'auth.invitation.registration_error',
              ),
              detail: this.translateService.instant(
                'auth.invitation.registration_error_username_exists',
              ),
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: this.translateService.instant(
                'auth.invitation.registration_error',
              ),
              detail: this.translateService.instant(
                'auth.invitation.registration_error_wrong_hash',
              ),
            });
          }
        }
      });
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromEvent<any>(this.usernameInput.nativeElement, 'input')
      .pipe(
        map((event: Event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe((data) => this.checkUsername(data));
  }

  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.errorSubscription?.unsubscribe();
    this.usernameCheckSubscription?.unsubscribe();
  }

  register() {
    const dto: RegisterRequestDto = {
      username: this.registerForm.get('username')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? '',
      email: this.registerForm.get('email')?.value ?? '',
      firstName: this.registerForm.get('firstName')?.value ?? '',
      lastName: this.registerForm.get('lastName')?.value ?? '',
    };
    this.store.dispatch(
      acceptInvitation({ dto: dto, invitationHash: this.invitationHash ?? '' }),
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
