import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlatformDto } from '../../domain/dto/platform.dto';
import { api } from './api';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<PlatformDto[]> {
    return this.http.get<PlatformDto[]>(api.platformUrl, api.authOptions);
  }
}
