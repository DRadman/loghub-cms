import {
  HttpRequest,
  HttpEvent,
  HttpInterceptorFn,
  HttpResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const dateInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(request).pipe(
    tap(
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          convertToDate(body);
        }
      },
    ),
  );
};

const iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function convertToDate(body: any) {
  if (body === null || body === undefined) {
    return body;
  }

  if (typeof body !== 'object') {
    return body;
  }

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIso8601(value)) {
      body[key] = new Date(value);
    } else if (typeof value === 'object') {
      convertToDate(value);
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function isIso8601(value: any) {
  if (value === null || value === undefined) {
    return false;
  }

  return iso8601.test(value);
}
