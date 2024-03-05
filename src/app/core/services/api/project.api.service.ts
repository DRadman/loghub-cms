import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../domain/dto/project.dto';
import { CreateProjectRequestDto } from '../../domain/dto/requests/create-project-request.dto';
import { api } from './api';
import { ProjectStatDto } from '../../domain/dto/project-stat.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(api.projectUrl, api.authOptions);
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

  getProjectStats(projectId: string): Observable<ProjectStatDto> {
    return this.http.get<ProjectStatDto>(
      api.projectUrl + `/${projectId}/stats`,
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
}
