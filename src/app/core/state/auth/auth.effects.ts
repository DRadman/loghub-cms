import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/api/auth.api.service';
import { JwtService } from '../../services/token-storage.service';
import {
  authenticate,
  authenticationFailure,
  authenticationSuccess,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  signOut,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private actions$: Actions
  ) {}

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentUser),
      switchMap(() =>
        this.authService.me().pipe(
          map((user) => loadCurrentUserSuccess(user)),
          catchError((error) => of(loadCurrentUserFailure({ error })))
        )
      )
    )
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
            catchError((error) => of(authenticationFailure({ error })))
          )
      )
    )
  );

  authenticationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationSuccess),
      switchMap(() =>
        this.authService.me().pipe(
          map((user) => loadCurrentUserSuccess(user)),
          catchError((error) => of(authenticationFailure({ error })))
        )
      )
    )
  );

  signOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signOut),
        tap(() => {
          this.jwtService.clear();
        })
      ),
    { dispatch: false }
  );
}
