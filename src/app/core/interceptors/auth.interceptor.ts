import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AUTHENTICATE } from '../services/api/api';
import { AuthService } from '../services/api/auth.api.service';
import { JwtService } from '../services/token-storage.service';
import { AppState } from '../state/app.state';
import { setToken, signOut } from '../state/auth/auth.actions';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (request.context.get(AUTHENTICATE)) {
    const accessToken = inject(JwtService).getToken();
    if (accessToken) {
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next(clonedRequest);
    } else {
      return next(request);
    }
  } else {
    return next(request);
  }
};

export const unauthErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  const store = inject(Store<AppState>);
  const router = inject(Router);

  if (req.context.get(AUTHENTICATE)) {
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          !(
            req.url.includes('auth/authenticate') ||
            req.url.includes('auth/refreshToken')
          ) && // <- this will avoid an infinite loop when the accessToken expires.
          error.status === 401
        ) {
          const refreshToken = jwtService.getRefreshToken();
          if (refreshToken) {
            return authService.refreshToken(refreshToken).pipe(
              switchMap((refreshResult) => {
                jwtService.saveToken(refreshResult.refreshToken);
                jwtService.saveToken(refreshResult.accessToken);
                store.dispatch(setToken(refreshResult));
                return next(
                  req.clone({
                    headers: req.headers.set(
                      'Authorization',
                      `Bearer ${refreshResult.accessToken}`
                    ),
                  })
                );
              }),
              catchError((error) => {
                if (error.status === '401') {
                  jwtService.clear();
                  store.dispatch(signOut());
                }
                return throwError(() => error);
              })
            );
          }
        }
        router.navigate(['/auth'])
        store.dispatch(signOut());
        return throwError(() => new Error('Unauthorized Exception'));
      })
    );
  } else {
    return next(req);
  }
};
