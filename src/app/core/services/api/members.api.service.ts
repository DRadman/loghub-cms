import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersDto } from '../../domain/dto/members.dto';
import { api } from './api';
import { InvitationDto } from '../../domain/dto/invitation.dto';
import { InvitationRequestDto } from '../../domain/dto/requests/invitation-request.dto';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  constructor(private http: HttpClient) {}

  getMembers(): Observable<MembersDto> {
    return this.http.get<MembersDto>(api.membersUrl, api.authOptions);
  }

  inviteMember(dto: InvitationRequestDto) {
    return this.http.post<InvitationDto>(
      api.invitationUrl + '/send',
      dto,
      api.authOptions,
    );
  }

  removeMember(memberId: string) {
    return this.http.delete(api.membersUrl + '/' + memberId, api.authOptions);
  }
}
