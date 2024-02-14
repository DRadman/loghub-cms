import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from '../../../environments/environment';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const registrationGuard: CanActivateFn = (
  _next: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot) => {
    return environment.enableRegistration;
}