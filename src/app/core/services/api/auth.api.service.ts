import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from './api';
import { TokenDto } from '../../domain/dto/token.dto';
import { Observable } from 'rxjs';
import { AuthenticateRequestDto } from '../../domain/dto/requests/authenticate-request.dto';
import { UserDto } from '../../domain/dto/user.dto';
import { RegisterRequestDto } from '../../domain/dto/requests/register-request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  refreshToken(refreshToken: string): Observable<TokenDto> {
    return this.http.post<TokenDto>(
      api.authUrl + '/refreshToken',
      { refreshToken: refreshToken },
      api.noAuthOptions
    );
  }

  authenticate(request: AuthenticateRequestDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(
      api.authUrl + '/authenticate',
      request,
      api.noAuthOptions
    );
  }

  me(): Observable<UserDto> {
    return this.http.get<UserDto>(api.authUrl + '/me', api.authOptions);
  }

  isUsernameTaken(username: string): Observable<boolean> {
    const params = new HttpParams().set('username', username);
    return this.http.get<boolean>(api.authUrl + '/username/taken', {
      ...api.noAuthOptions,
      params,
    });
  }

  forgotPassword(username: string): Observable<UserDto> {
    return this.http.post<UserDto>(
      api.authUrl + '/forgot-password',
      { username: username },
      api.noAuthOptions
    );
  }

  register(dto: RegisterRequestDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      api.authUrl + '/register',
      dto,
      api.noAuthOptions
    );
  }
}
