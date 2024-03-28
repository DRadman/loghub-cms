import { Platform } from "./platform.entity"
import { ProjectRelease } from "./project-release.entity"

export interface Project {
    projectId: string,
    name: string,
    platform: Platform,
    environments: string[],
    releases: ProjectRelease[],
}