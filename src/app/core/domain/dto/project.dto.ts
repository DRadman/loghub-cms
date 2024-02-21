import { PlatformDto } from "./platform.dto";

export interface ProjectDto {
    projectId: string,
    name: string,
    platform: PlatformDto
}