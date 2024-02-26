import { createAction, props } from '@ngrx/store';
import { Team } from '../../domain/models/team.entity';
import { User } from '../../domain/models/user.entity';
import { Project } from '../../domain/models/project.entity';

export const loadTeamById = createAction(
  '[Single Team Page] Load team',
  props<{ teamId: string }>(),
);

export const resetSingleTeamState = createAction('[Single Team Page] Reset state');

export const loadTeamByIdSuccess = createAction(
  '[Team API] Get team by id success',
  props<{ team: Team }>(),
);

export const loadTeamByIdFailure = createAction(
  '[Team API] Get team by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadTeamMembers = createAction(
  '[Single Team Page] Load team members',
  props<{ teamId: string }>(),
);

export const loadTeamMembersSuccess = createAction(
  '[Team API] Get team members by id success',
  props<{ members: User[] }>(),
);

export const loadTeamMembersFailure = createAction(
  '[Team API] Get team members by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadTeamProjects = createAction(
  '[Single Team Page] Load team projects',
  props<{ teamId: string }>(),
);

export const loadTeamProjectsSuccess = createAction(
  '[Team API] Get team projects by id success',
  props<{ projects: Project[] }>(),
);

export const loadTeamProjectsFailure = createAction(
  '[Team API] Get team projects by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const updateTeam = createAction(
  '[Single Team Page] Update team',
  props<{ teamId: string; dto: { slug: string } }>(),
);

export const updateTeamSuccess = createAction(
  '[Team API] Update team by id success',
  props<{ team: Team }>(),
);

export const updateTeamFailure = createAction(
  '[Team API] Update team by id failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addTeamMembers = createAction(
  '[Single Team Page] Add team members',
  props<{ teamId: string; ids: string[] }>(),
);

export const addTeamMembersSuccess = createAction(
  '[Team API] Add team members success',
  props<{ members: User[] }>(),
);

export const addTeamMembersFailure = createAction(
  '[Team API] Add team members failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeTeamMembers = createAction(
  '[Single Team Page] Remove team members',
  props<{ teamId: string; ids: string[] }>(),
);

export const removeTeamMembersSuccess = createAction(
  '[Team API] Remove team members success',
  props<{ members: User[] }>(),
);

export const removeTeamMembersFailure = createAction(
  '[Team API] Remove team members failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const addTeamProjects = createAction(
  '[Single Team Page] Add team projects',
  props<{ teamId: string; ids: string[] }>(),
);

export const addTeamProjectsSuccess = createAction(
  '[Team API] Add team projects success',
  props<{ projects: Project[] }>(),
);

export const addTeamProjectsFailure = createAction(
  '[Team API] Add team projects failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeTeamProjects = createAction(
  '[Single Team Page] Remove team projects',
  props<{ teamId: string; ids: string[] }>(),
);

export const removeTeamProjectsSuccess = createAction(
  '[Team API] Remove team projects success',
  props<{ projects: Project[] }>(),
);

export const removeTeamProjectsFailure = createAction(
  '[Team API] Remove team projects failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);
