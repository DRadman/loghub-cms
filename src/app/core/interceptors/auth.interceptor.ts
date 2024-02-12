import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/token-storage.service';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/api/auth.api.service';
import { AUTHENTICATE } from '../services/api/api';

function handle401Error(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  error: any
): Observable<any> {
  const jwtService = inject(JwtService);
  const authService = inject(AuthService);
  const refreshToken = jwtService.getRefreshToken();
  if (refreshToken && refreshToken != null) {
    // We have token, Try to refresh token
    return authService.refreshToken(refreshToken).pipe(
      switchMap((value) => {
        //Refresh Token Success
        //Save Token
        jwtService.saveToken(value.accessToken);
        jwtService.saveRefreshToken(value.refreshToken);

        //Retry Original Request
        const retryRequest = req.clone({
          headers: req.headers.append(
            'Authorization',
            `Bearer ${value.accessToken}`
          ),
        });
        return next(retryRequest);
      }),
      catchError(() => {
        //Refresh token failed, throw original error
        return throwError(() => error);
      })
    );
  } else {
    //We dont have refreshToken, throw original error
    return throwError(() => error);
  }
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  if (req.context.get(AUTHENTICATE)) {
    // Inject the current `AuthService` and use it to get an authentication token:
    const accessToken = inject(JwtService).getToken();
    if (accessToken && accessToken != null) {
      //We have token lets append it to headers
      const newReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${accessToken}`),
      });
      return next(newReq).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return handle401Error(req, next, error);
          }
          return throwError(() => error);
        })
      );
    } else {
      //We don't have access token let request go
      return next(req);
    }
  } else {
    // Authentication Has Been Disabled
    return next(req);
  }
}
