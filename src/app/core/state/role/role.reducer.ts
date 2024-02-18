import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Role } from '../../domain/models/user.entity';
import { loadRoles, loadRolesFailure, loadRolesSuccess } from './role.actions';

export interface RoleState {
  roles: Role[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | null;
  status: StateStatus;
}

export const initialState: RoleState = {
    roles: null,
    error: undefined,
    status: StateStatus.PENDING
}

export const roleReducer = createReducer(
    initialState,

    //Handle loading current organization members
  on(loadRoles, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadRolesSuccess, (state, params) => ({
    ...state,
    roles: params.roles,
    error: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadRolesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),

)