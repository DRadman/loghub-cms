import { PlatformDto } from "./platform.dto";
import { ProjectReleaseDto } from "./project-release.dto";

export interface ProjectDto {
    projectId: string,
    name: string,
    platform: PlatformDto
    environments: string[],
    releases: ProjectReleaseDto[],
}