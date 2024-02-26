import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../domain/dto/project.dto';
import { CreateTeamRequestDto } from '../../domain/dto/requests/create-team-request.dto';
import { TeamDto } from '../../domain/dto/team.dto';
import { UserDto } from '../../domain/dto/user.dto';
import { Project } from '../../domain/models/project.entity';
import { User } from '../../domain/models/user.entity';
import { api } from './api';

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

  getTeamById(teamId: string): Observable<TeamDto> {
    return this.http.get<TeamDto>(api.teamUrl + '/' + teamId, api.authOptions);
  }

  getTeamMembers(teamId: string): Observable<User[]> {
    return this.http.get<User[]>(
      api.teamUrl + `/${teamId}/members`,
      api.authOptions,
    );
  }

  getTeamProjects(teamId: string): Observable<Project[]> {
    return this.http.get<Project[]>(
      api.teamUrl + `/${teamId}/projects`,
      api.authOptions,
    );
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

  updateTeam(teamId: string, dto: { slug: string }): Observable<TeamDto> {
    return this.http.patch<TeamDto>(
      api.teamUrl + '/' + teamId,
      dto,
      api.authOptions,
    );
  }

  addTeamMembers(teamId: string, ids: string[]): Observable<UserDto[]> {
    return this.http.put<UserDto[]>(
      api.teamUrl + `/${teamId}/members`,
      undefined,
      {
        ...api.authOptions,
        params: { ids: ids },
      },
    );
  }

  removeTeamMembers(teamId: string, ids: string[]): Observable<UserDto[]> {
    return this.http.delete<UserDto[]>(api.teamUrl + `/${teamId}/members`, {
      ...api.authOptions,
      params: { ids: ids },
    });
  }

  addTeamProjects(teamId: string, ids: string[]): Observable<ProjectDto[]> {
    return this.http.put<ProjectDto[]>(
      api.teamUrl + `/${teamId}/projects`,
      undefined,
      {
        ...api.authOptions,
        params: { ids: ids },
      },
    );
  }

  removeTeamProjects(teamId: string, ids: string[]): Observable<ProjectDto[]> {
    return this.http.delete<ProjectDto[]>(api.teamUrl + `/${teamId}/projects`, {
      ...api.authOptions,
      params: { ids: ids },
    });
  }
}
