import {
  HttpContext,
  HttpContextToken,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export const AUTHENTICATE = new HttpContextToken<boolean>(() => false);

export const api = {
  url: environment.apiUrl,
  teamUrl: environment.apiUrl + '/v1/team',
  projectUrl: environment.apiUrl + '/v1/project',
  profileUrl: environment.apiUrl + '/v1/user-profile',
  platformUrl: environment.apiUrl + '/v1/platform',
  organizationUrl: environment.apiUrl + '/v1/organization',
  invitationUrl: environment.apiUrl + '/v1/invitation',
  deviceUrl: environment.apiUrl + '/v1/device',
  membersUrl: environment.apiUrl + '/v1/members',
  filesUrl: environment.apiUrl + '/v1/files',
  authUrl: environment.apiUrl + '/v1/auth',
  roleUrl: environment.apiUrl + '/v1/role',
  authOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    }),
    context: new HttpContext().set(AUTHENTICATE, true),
  },
  authOptionsAutoContentType: {
    headers: new HttpHeaders({
      'ngrok-skip-browser-warning': 'true',
    }),
    context: new HttpContext().set(AUTHENTICATE, true),
  },
  noAuthOptions: {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    }),
    context: new HttpContext().set(AUTHENTICATE, false),
  },
};
