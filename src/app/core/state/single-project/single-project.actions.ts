import { createAction, props } from "@ngrx/store";
import { Project } from "../../domain/models/project.entity";
import { CreateProjectRequestDto } from "../../domain/dto/requests/create-project-request.dto";
import { Team } from "../../domain/models/team.entity";
import { ProjectRelease } from "../../domain/models/project-release.entity";
import { ProjectDebugFile } from "../../domain/models/project-debug-file.entity";
import { CreateProjectReleaseDto } from "../../domain/dto/requests/create-project-release.dto";
import { CreateProjectDebugFileDto } from "../../domain/dto/requests/create-project-debug-file.dto";

export const loadProjectById = createAction(
  '[Single Project Page] Load project',
  props<{ projectId: string }>(),
);

export const resetSingleProjectState = createAction(
  '[Single Project Page] Reset state',
);

export const loadProjectByIdSuccess = createAction(
  '[Project API] Get project by id success',
  props<{ project: Project }>(),
);

export const loadProjectByIdFailure = createAction(
  '[Project API] Get project by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const updateProject = createAction(
  '[Single Project Page] Update project',
  props<{ projectId: string; dto: CreateProjectRequestDto }>(),
);

export const updateProjectSucess = createAction(
  '[Project API] Update project by id success',
  props<{ project: Project }>(),
);

export const updateProjectFailure = createAction(
  '[Project API] Update project by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadProjectTeams = createAction(
  '[Single Project Page] Load project teams',
  props<{ projectId: string }>(),
);

export const loadProjectTeamsSuccess = createAction(
  '[Project API] Get project teams by id success',
  props<{ teams: Team[] }>(),
);

export const loadProjectTeamsFailure = createAction(
  '[Project API] Get project teams by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addProjectTeams = createAction(
  '[Single Project Page] Add project teams',
  props<{ projectId: string; ids: string[] }>(),
);

export const addProjectTeamsSuccess = createAction(
  '[Project API] Add project teams success',
  props<{ teams: Team[] }>(),
);

export const addProjectTeamsFailure = createAction(
  '[Project API] Remove project teams failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);


export const removeProjectTeams = createAction(
  '[Single Team Page] Remove project teams',
  props<{ projectId: string; ids: string[] }>(),
);

export const removeProjectTeamsSuccess = createAction(
  '[Project API] Remove project teams success',
  props<{ teams: Team[] }>(),
);

export const removeProjectTeamsFailure = createAction(
  '[Project API] Remove project teams failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadProjectTags = createAction(
  '[Single Project Page] Load project tags',
  props<{ projectId: string }>(),
);

export const loadProjectTagsSuccess = createAction(
  '[Project API] Get project tags by id success',
  props<{ tags: string[] }>(),
);

export const loadProjectTagsFailure = createAction(
  '[Project API] Get project tags by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadProjectEnvironments = createAction(
  '[Single Project Page] Load project environments',
  props<{ projectId: string }>(),
);

export const loadProjectEnvironmentsSuccess = createAction(
  '[Project API] Get project environments by id success',
  props<{ environments: string[] }>(),
);

export const loadProjectEnvironmentsFailure = createAction(
  '[Project API] Get project environments by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadProjectReleases = createAction(
  '[Single Project Page] Load project releases',
  props<{ projectId: string }>(),
);

export const loadProjectReleasesSuccess = createAction(
  '[Project API] Get project releases by id success',
  props<{ releases: ProjectRelease[] }>(),
);

export const loadProjectReleasesFailure = createAction(
  '[Project API] Get project releases by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadProjectDebugFiles = createAction(
  '[Single Project Page] Load project debug files',
  props<{ projectId: string }>(),
);

export const loadProjectDebugFilesSuccess = createAction(
  '[Project API] Get project debug files by id success',
  props<{ debugFiles: ProjectDebugFile[] }>(),
);

export const loadProjectDebugFilesFailure = createAction(
  '[Project API] Get project debug files by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeProjectTags = createAction(
  '[Single Team Page] Remove project tags',
  props<{ projectId: string; tags: string[] }>(),
);

export const removeProjectTagsSuccess = createAction(
  '[Project API] Remove project tags success',
  props<{ tags: string[] }>(),
);

export const removeProjectTagsFailure = createAction(
  '[Project API] Remove project tags failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addProjectTags = createAction(
  '[Single Team Page] Add project tags',
  props<{ projectId: string; tags: string[] }>(),
);

export const addProjectTagsSuccess = createAction(
  '[Project API] Add project tags success',
  props<{ tags: string[] }>(),
);

export const addProjectTagsFailure = createAction(
  '[Project API] Add project tags failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeProjectEnvironments = createAction(
  '[Single Team Page] Remove project environments',
  props<{ projectId: string; environments: string[] }>(),
);

export const removeProjectEnvironmentsSuccess = createAction(
  '[Project API] Remove project environments success',
  props<{ environments: string[] }>(),
);

export const removeProjectEnvironmentsFailure = createAction(
  '[Project API] Remove project environments failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addProjectEnvironments = createAction(
  '[Single Team Page] Add project environments',
  props<{ projectId: string; environments: string[] }>(),
);

export const addProjectEnvironmentsSuccess = createAction(
  '[Project API] Add project environments success',
  props<{ environments: string[] }>(),
);

export const addProjectEnvironmentsFailure = createAction(
  '[Project API] Add project environments failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeProjectReleases = createAction(
  '[Single Team Page] Remove project releases',
  props<{ projectId: string; ids: string[] }>(),
);

export const removeProjectReleasesSuccess = createAction(
  '[Project API] Remove project releases success',
  props<{ releases: ProjectRelease[] }>(),
);

export const removeProjectReleasesFailure = createAction(
  '[Project API] Remove project releases failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addProjectRelease = createAction(
  '[Single Team Page] Add project release',
  props<{ projectId: string; dto: CreateProjectReleaseDto }>(),
);

export const addProjectReleaseSuccess = createAction(
  '[Project API] Add project release success',
  props<{ releases: ProjectRelease[] }>(),
);

export const addProjectReleaseFailure = createAction(
  '[Project API] Add project release failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeProjectDebugFiles = createAction(
  '[Single Team Page] Remove project debug files',
  props<{ projectId: string; ids: string[] }>(),
);

export const removeProjectDebugFilesSuccess = createAction(
  '[Project API] Remove project debug files success',
  props<{ debugFiles: ProjectDebugFile[] }>(),
);

export const removeProjectDebugFilesFailure = createAction(
  '[Project API] Remove project debug files failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addProjectDebugFile = createAction(
  '[Single Team Page] Add project debug file',
  props<{ projectId: string; dto: CreateProjectDebugFileDto }>(),
);

export const addProjectDebugFileSuccess = createAction(
  '[Project API] Add project debug file success',
  props<{ debugFiles: ProjectDebugFile[] }>(),
);

export const addProjectDebugFileFailure = createAction(
  '[Project API] Add project debug file failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);