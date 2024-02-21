import { Platform } from "./platform.entity"

export interface Project {
    projectId: string,
    name: string,
    platform: Platform
}