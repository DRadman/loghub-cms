import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/api/auth.api.service';
import { JwtService } from '../../services/token-storage.service';
import {
  authenticate,
  authenticationFailure,
  authenticationSuccess,
  forgotPassword,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  registerNewUser,
  registerNewUserFailure,
  registerNewUserSuccess,
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
  signOut,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private actions$: Actions,
  ) {}

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(() =>
        this.authService.me().pipe(
          map((user) => loadCurrentUserSuccess(user)),
          catchError((error) => of(loadCurrentUserFailure({ error }))),
        ),
      ),
    ),
  );

  authenticate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticate),
      switchMap((request) =>
        this.authService
          .authenticate({
            username: request.username,
            password: request.password,
          })
          .pipe(
            map((token) => {
              this.jwtService.saveToken(token.accessToken);
              this.jwtService.saveRefreshToken(token.refreshToken);
              return authenticationSuccess(token);
            }),
            catchError((error) => of(authenticationFailure({ error }))),
          ),
      ),
    ),
  );

  forgotPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(forgotPassword),
      switchMap((request) =>
        this.authService.forgotPassword(request.username).pipe(
          map(() => {
            return forgotPasswordSuccess();
          }),
          catchError((error) => of(forgotPasswordFailure({ error }))),
        ),
      ),
    ),
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetPassword),
      switchMap((request) =>
        this.authService.resetPassword(request).pipe(
          map(() => {
            return resetPasswordSuccess();
          }),
          catchError((error) => of(resetPasswordFailure({ error }))),
        ),
      ),
    ),
  );

  authenticationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationSuccess),
      switchMap(() =>
        this.authService.me().pipe(
          map((user) => loadCurrentUserSuccess(user)),
          catchError((error) => of(authenticationFailure({ error }))),
        ),
      ),
    ),
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        tap(() => {
          this.jwtService.clear();
        }),
      ),
    { dispatch: false },
  );

  registerNewUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerNewUser),
      switchMap((request) =>
        this.authService.register(request).pipe(
          map(() => {
            return registerNewUserSuccess({
              username: request.username,
              password: request.password,
            });
          }),
          catchError((error) => of(registerNewUserFailure({ error }))),
        ),
      ),
    ),
  );

  registerNewUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerNewUserSuccess),
      switchMap((request) => of(authenticate(request))),
    ),
  );
}
