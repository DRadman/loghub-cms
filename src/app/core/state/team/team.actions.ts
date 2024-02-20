import { createAction, props } from '@ngrx/store';
import { CreateTeamRequestDto } from '../../domain/dto/requests/create-team-request.dto';
import { Team } from '../../domain/models/team.entity';

export const loadOrganizationTeams = createAction(
  '[Team Settings Page] Load current organization teams',
);

export const loadOrganizationTeamsSuccess = createAction(
  '[Team API] Get organization teams success',
  props<{ teams: Team[] }>(),
);

export const loadOrganizationTeamsFailure = createAction(
  '[Team API] Get organization teams failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadMyTeams = createAction(
  '[Team Settings Page] Load current user teams',
);

export const loadMyTeamsSuccess = createAction(
  '[Team API] Get current user teams success',
  props<{ teams: Team[] }>(),
);

export const loadMyTeamsFailure = createAction(
  '[Team API] Get current user teams failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const createTeam = createAction(
  '[Team Settings Page] Create team',
  props<CreateTeamRequestDto>(),
);

export const createTeamSuccess = createAction(
  '[Team API] Create team success',
  props<Team>(),
);

export const createTeamFailure = createAction(
  '[Organization API] Create team failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);
