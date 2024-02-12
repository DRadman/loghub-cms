import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/api/auth.api.service';
import { AppState } from '../../../../core/state/app.state';
import {
  authenticate,
  setCurrentUser,
} from '../../../../core/state/auth/auth.actions';
import { isLoading } from '../../../../core/state/auth/auth.selectors';
import { AuthState } from '../../../../core/state/auth/auth.reducer';

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
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  isLoading = this.store.select(isLoading);

  ngOnInit() {
    this.authService.me().subscribe((dto) => {
      this.store.dispatch(setCurrentUser(dto));
    });
    this.store.select(isLoading).subscribe((isLoading) => {
      console.log("Loading: "+isLoading)
    })
  }

  login() {
    this.store.dispatch(
      authenticate({
        username: this.loginForm.get('username')?.value!,
        password: this.loginForm.get('password')?.value!,
      })
    );
  }

  getApplicationName() {
    return environment.appName;
  }

  isRegistrationEnabled() {
    return environment.enableRegistration;
  }
}
