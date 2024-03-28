import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../domain/pageable/page.dto';
import { LogSourceDto } from '../../domain/dto/log-source.dto';
import { api } from './api';
import { Pageable } from '../../domain/pageable/pageable.dto';

@Injectable({
  providedIn: 'root',
})
export class LogSourceService {
  constructor(private http: HttpClient) {}

  findAll(
    pageable: Pageable,
    filters: {
      projectIds: string[];
      environments?: string[];
      releaseIds?: string[];
      search?: string;
    },
  ): Observable<Page<LogSourceDto>> {
    const params: {
      [param: string]:
        | string
        | number
        | boolean
        | readonly (string | number | boolean)[];
    } = {};
    params['page'] = pageable.page;
    params['size'] = pageable.size;
    params['sort'] = pageable.sort;
    params['projectIds'] = filters.projectIds;
    if (filters.environments) {
      params['environments'] = filters.environments;
    }
    if (filters.releaseIds) {
        params['releaseIds'] = filters.releaseIds;
    }
    if (filters.search) {
      params['search'] = filters.search;
    }

    return this.http.get<Page<LogSourceDto>>(api.logSourceUrl, {
      ...api.authOptions,
      params: params,
    });
  }
}
