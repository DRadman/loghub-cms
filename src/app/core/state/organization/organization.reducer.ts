import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Organization } from '../../domain/models/organization.entity';
import {
  createOrganization,
  createOrganizationFailure,
  createOrganizationSuccess,
  loadCurrentOrganization,
  loadCurrentOrganizationFailure,
  loadCurrentOrganizationSuccess,
} from './organization.actions';

export interface OrganizationState {
  organization: Organization | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | null;
  status: StateStatus;
}

export const initialState: OrganizationState = {
  organization: null,
  error: undefined,
  status: StateStatus.PENDING,
};

export const organizationReducer = createReducer(
  initialState,

  //Handle loading current organization
  on(loadCurrentOrganization, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadCurrentOrganizationSuccess, (state, organization) => ({
    ...state,
    organization: organization,
    error: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadCurrentOrganizationFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),

  //Handle create new organization
  on(createOrganization, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle create new organization success
  on(createOrganizationSuccess, (state, organization) => ({
    ...state,
    organization: organization,
    error: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle create new organization failure
  on(createOrganizationFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),
);
