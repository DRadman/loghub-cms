import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pageable } from "../../domain/pageable/pageable.dto";
import { LogSessionDto } from "../../domain/dto/log-session.dto";
import { Page } from "../../domain/pageable/page.dto";
import { Observable } from "rxjs";
import { api } from "./api";

@Injectable({
    providedIn: 'root',
  })
  export class LogSessionService {
    constructor(private http: HttpClient) {}
  
    findAll(
      pageable: Pageable,
      filters: {
        projectIds?: string[];
        logSourceIds?: string[];
        search?: string;
      },
    ): Observable<Page<LogSessionDto>> {
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
      if (filters.logSourceIds) {
          params['logSourceIds'] = filters.logSourceIds;
      }
      if (filters.projectIds) {
        params['projectIds'] = filters.projectIds;
      }
      if (filters.search) {
        params['search'] = filters.search;
      }
  
      return this.http.get<Page<LogSessionDto>>(api.logSessionUrl, {
        ...api.authOptions,
        params: params,
      });
    }
  }
  