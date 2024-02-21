import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../../domain/models/user.entity';
import { api } from './api';
import { PlatformDto } from '../../domain/dto/platform.dto';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  constructor(private http: HttpClient) {}

  getPlatforms(): Observable<PlatformDto[]> {
    return this.http.get<PlatformDto[]>(api.platformUrl, api.authOptions);
  }
}
