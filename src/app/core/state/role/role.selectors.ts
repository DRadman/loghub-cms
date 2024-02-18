import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { RoleState } from './role.reducer';

export const selectRoleState = (state: AppState) => state.roleState;

export const selectRoles = createSelector(
  selectRoleState,
  (state: RoleState) => state.roles,
);
