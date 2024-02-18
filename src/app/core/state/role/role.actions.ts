import { createAction, props } from '@ngrx/store';
import { Role } from '../../domain/models/user.entity';

export const loadRoles = createAction('[Roles Page] Load roles');

export const loadRolesSuccess = createAction(
  '[Role API] Get roles success',
  props<{ roles: Role[] }>(),
);

export const loadRolesFailure = createAction(
  '[Role API] Get roles failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);
