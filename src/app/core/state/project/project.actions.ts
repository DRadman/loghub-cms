import { createAction, props } from '@ngrx/store';
import { Project } from '../../domain/models/project.entity';
import { CreateProjectRequestDto } from '../../domain/dto/requests/create-project-request.dto';

export const loadAllProjects = createAction(
  '[Projects Page] Load all projects',
);

export const loadAllProjectsSuccess = createAction(
  '[Project API] Get all projects success',
  props<{ projects: Project[] }>(),
);

export const loadAllProjectsFailure = createAction(
  '[Project API] Get all projects failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const createProject = createAction(
  '[Project Settings Page] Create project',
  props<CreateProjectRequestDto>(),
);

export const createProjectSuccess = createAction(
  '[Project API] Create project success',
  props<Project>(),
);

export const createProjectFailure = createAction(
  '[Project API] Create project failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadMyProjects = createAction(
  '[Projects Page] Load my projects',
  props<{ teamIds?: string[] }>(),
);

export const loadMyProjectsSuccess = createAction(
  '[Project API] Get my projects success',
  props<{ projects: Project[] }>(),
);

export const loadMyProjectsFailure = createAction(
  '[Project API] Get my projects failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);
