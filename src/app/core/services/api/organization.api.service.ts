import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CreateOrganizationRequestDto } from "../../domain/dto/requests/create-organization-request.dto";
import { OrganizationDto } from "../../domain/dto/organization.dto";
import { api } from "./api";

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  createOrganization(dto: CreateOrganizationRequestDto): Observable<OrganizationDto> {
    return this.http.post<OrganizationDto>(
      api.organizationUrl,
      dto,
      api.authOptions
    );
  }

  getOrganization(): Observable<OrganizationDto> {
    return this.http.get<OrganizationDto>(
      api.organizationUrl,
      api.authOptions
    );
  }

  isSlugTaken(slug: string): Observable<boolean> {
    return this.http.get<boolean>(
      api.organizationUrl + '/slug/taken?slug=' + slug,
      api.authOptions
    );
  }
}
