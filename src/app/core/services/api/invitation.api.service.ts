import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembersDto } from '../../domain/dto/members.dto';
import { api } from './api';
import { InvitationDto } from '../../domain/dto/invitation.dto';
import { InvitationRequestDto } from '../../domain/dto/requests/invitation-request.dto';
import { RegisterRequestDto } from '../../domain/dto/requests/register-request.dto';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  constructor(private http: HttpClient) {}

  inviteMember(dto: InvitationRequestDto) {
    return this.http.post<InvitationDto>(
      api.invitationUrl + '/send',
      dto,
      api.authOptions,
    );
  }

  getInvitationDetails(invitationHash: string): Observable<InvitationDto> {
    return this.http.get<InvitationDto>(
      api.invitationUrl + '/details/' + invitationHash,
      api.noAuthOptions,
    );
  }

  acceptInvitation(invitationHash: string, dto: RegisterRequestDto) {
    return this.http.post<InvitationDto>(
      api.invitationUrl + '/accept/' + invitationHash,
      dto,
      api.noAuthOptions,
    );
  }
}
