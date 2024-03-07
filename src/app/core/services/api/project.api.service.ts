import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectStatDto } from '../../domain/dto/project-stat.dto';
import { ProjectDto } from '../../domain/dto/project.dto';
import { CreateProjectRequestDto } from '../../domain/dto/requests/create-project-request.dto';
import { api } from './api';
import { ProjectSecurityClientDto } from '../../domain/dto/project-security-client.dto';
import { TeamDto } from '../../domain/dto/team.dto';
import { ProjectReleaseDto } from '../../domain/dto/project-release.dto';
import { ProjectDebugFileDto } from '../../domain/dto/project-debug-file.dto';
import { CreateProjectReleaseDto } from '../../domain/dto/requests/create-project-release.dto';
import { CreateProjectDebugFileDto } from '../../domain/dto/requests/create-project-debug-file.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(api.projectUrl, api.authOptions);
  }

  getProjectById(projectId: string): Observable<ProjectDto> {
    return this.http.get<ProjectDto>(
      api.projectUrl + '/' + projectId,
      api.authOptions,
    );
  }

  getMyProjects(teamIds?: string[]): Observable<ProjectDto[]> {
    if (teamIds) {
      return this.http.get<ProjectDto[]>(api.projectUrl + '/my', {
        ...api.authOptions,
        params: { teamId: teamIds },
      });
    } else {
      return this.http.get<ProjectDto[]>(
        api.projectUrl + '/my',
        api.authOptions,
      );
    }
  }

  getProjectTeams(projectId: string): Observable<TeamDto[]> {
    return this.http.get<TeamDto[]>(
      api.projectUrl + `/${projectId}/teams`,
      api.authOptions,
    );
  }

  getProjectStats(projectId: string): Observable<ProjectStatDto> {
    return this.http.get<ProjectStatDto>(
      api.projectUrl + `/${projectId}/stats`,
      api.authOptions,
    );
  }

  getProjectSecurityClientConfig(
    projectId: string,
  ): Observable<ProjectSecurityClientDto> {
    return this.http.get<ProjectSecurityClientDto>(
      api.projectUrl + `/${projectId}/client-security`,
      api.authOptions,
    );
  }

  getProjectReleases(projectId: string): Observable<ProjectReleaseDto[]> {
    return this.http.get<ProjectReleaseDto[]>(
      api.projectUrl + `/${projectId}/releases`,
      api.authOptions,
    );
  }

  getProjectDebugFiles(projectId: string): Observable<ProjectDebugFileDto[]> {
    return this.http.get<ProjectDebugFileDto[]>(
      api.projectUrl + `/${projectId}/files`,
      api.authOptions,
    );
  }

  getProjectTags(projectId: string): Observable<string[]> {
    return this.http.get<string[]>(
      api.projectUrl + `/${projectId}/tags`,
      api.authOptions,
    );
  }

  getProjectEnvironments(projectId: string): Observable<string[]> {
    return this.http.get<string[]>(
      api.projectUrl + `/${projectId}/environments`,
      api.authOptions,
    );
  }

  createProject(dto: CreateProjectRequestDto): Observable<ProjectDto> {
    return this.http.post<ProjectDto>(api.projectUrl, dto, api.authOptions);
  }

  isNameTaken(name: string): Observable<boolean> {
    return this.http.get<boolean>(
      api.projectUrl + '/name/taken?name=' + name,
      api.authOptions,
    );
  }

  updateProject(
    projectId: string,
    dto: CreateProjectRequestDto,
  ): Observable<ProjectDto> {
    return this.http.patch<ProjectDto>(
      api.projectUrl + '/' + projectId,
      dto,
      api.authOptions,
    );
  }

  deleteProject(projectId: string) {
    return this.http.delete(api.projectUrl + '/' + projectId, api.authOptions);
  }

  addProjectTeams(projectId: string, ids: string[]): Observable<TeamDto[]> {
    return this.http.put<TeamDto[]>(
      api.projectUrl + `/${projectId}/teams`,
      undefined,
      {
        ...api.authOptions,
        params: { ids: ids },
      },
    );
  }

  addProjectTags(projectId: string, tags: string[]): Observable<string[]> {
    return this.http.put<string[]>(
      api.projectUrl + `/${projectId}/tags`,
      undefined,
      {
        ...api.authOptions,
        params: { tags: tags },
      },
    );
  }

  addProjectEnvironments(
    projectId: string,
    environments: string[],
  ): Observable<string[]> {
    return this.http.put<string[]>(
      api.projectUrl + `/${projectId}/environments`,
      undefined,
      {
        ...api.authOptions,
        params: { environments: environments },
      },
    );
  }

  addProjectRelease(
    projectId: string,
    dto: CreateProjectReleaseDto,
  ): Observable<ProjectReleaseDto[]> {
    return this.http.put<ProjectReleaseDto[]>(
      api.projectUrl + `/${projectId}/releases`,
      dto,
      api.authOptions,
    );
  }

  addProjectDebugFile(
    projectId: string,
    dto: CreateProjectDebugFileDto,
  ): Observable<ProjectDebugFileDto[]> {
    const data = new FormData();
    data.append('file', dto.file);
    return this.http.put<ProjectDebugFileDto[]>(
      api.projectUrl + `/${projectId}/files`,
      data,
      {
        ...api.authOptionsAutoContentType,
        params: { type: dto.type },
      },
    );
  }

  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, {
      ...api.authOptionsAutoContentType,
      reportProgress: true,
      responseType: 'blob'
    })
  }

  removeProjectTeams(projectId: string, ids: string[]): Observable<TeamDto[]> {
    return this.http.delete<TeamDto[]>(api.projectUrl + `/${projectId}/teams`, {
      ...api.authOptions,
      params: { ids: ids },
    });
  }

  removeProjectTags(projectId: string, tags: string[]): Observable<string[]> {
    return this.http.delete<string[]>(api.projectUrl + `/${projectId}/tags`, {
      ...api.authOptions,
      params: { tags: tags },
    });
  }

  removeProjectEnvironments(
    projectId: string,
    environments: string[],
  ): Observable<string[]> {
    return this.http.delete<string[]>(
      api.projectUrl + `/${projectId}/environments`,
      {
        ...api.authOptions,
        params: { environments: environments },
      },
    );
  }

  removeProjectReleases(
    projectId: string,
    ids: string[],
  ): Observable<ProjectReleaseDto[]> {
    return this.http.delete<ProjectReleaseDto[]>(
      api.projectUrl + `/${projectId}/releases`,
      {
        ...api.authOptions,
        params: { ids: ids },
      },
    );
  }

  removeProjectDebugFiles(
    projectId: string,
    ids: string[],
  ): Observable<ProjectDebugFileDto[]> {
    return this.http.delete<ProjectDebugFileDto[]>(
      api.projectUrl + `/${projectId}/files`,
      {
        ...api.authOptions,
        params: { ids: ids },
      },
    );
  }
}
