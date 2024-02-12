import { Injectable } from '@angular/core';
import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/api/auth.api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  authenticate,
  authenticationFailure,
  authenticationSuccess,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
} from './auth.actions';
import { JwtService } from '../../services/token-storage.service';

@Injectable()
export class AuthEffects {
  constructor(
    private store: Store<AppState>,
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
          catchError((error) => of(loadCurrentUserFailure({ error })))
        )
      )
    )
  );
}
