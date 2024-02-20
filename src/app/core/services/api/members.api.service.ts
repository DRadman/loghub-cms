import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersDto } from '../../domain/dto/members.dto';
import { api } from './api';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  getMembers(): Observable<MembersDto> {
    return this.http.get<MembersDto>(api.membersUrl, api.authOptions);
  }

  removeMember(memberId: string) {
    return this.http.delete(api.membersUrl + '/' + memberId, api.authOptions);
  }
}
