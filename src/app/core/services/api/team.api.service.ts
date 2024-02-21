import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamDto } from '../../domain/dto/team.dto';
import { api } from './api';
import { CreateTeamRequestDto } from '../../domain/dto/requests/create-team-request.dto';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) {}

  getOrganizationTeams(): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>(api.teamUrl, api.authOptions);
  }

  getMyTeams(): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>(api.teamUrl + '/my', api.authOptions);
  }

  isSlugTaken(slug: string): Observable<boolean> {
    return this.http.get<boolean>(
      api.teamUrl + '/slug/taken?slug=' + slug,
      api.authOptions,
    );
  }

  createNewTeam(dto: CreateTeamRequestDto): Observable<TeamDto> {
    return this.http.post<TeamDto>(api.teamUrl, dto, api.authOptions);
  }

  deleteTeam(teamId: string) {
    return this.http.delete(api.teamUrl + '/' + teamId, api.authOptions);
  }
}
