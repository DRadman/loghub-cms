import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Team } from '../../domain/models/team.entity';
import {
  createTeam,
  createTeamFailure,
  createTeamSuccess,
  deleteTeam,
  deleteTeamFailure,
  deleteTeamSuccess,
  loadMyTeams,
  loadMyTeamsSuccess,
  loadOrganizationTeams,
  loadOrganizationTeamsFailure,
  loadOrganizationTeamsSuccess,
} from './team.actions';

export interface TeamState {
  organizationTeams: Team[] | null;
  myTeams: Team[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  organizationTeamsError: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  myTeamsError: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createOrganizationTeamError: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteTeamError: any | null;
  organizationTeamsStatus: StateStatus;
  myTeamsStatus: StateStatus;
  createOrganizationTeamStatus: StateStatus;
  deleteTeamStatus: StateStatus;
}

export const initialState: TeamState = {
  organizationTeams: null,
  organizationTeamsError: undefined,
  organizationTeamsStatus: StateStatus.PENDING,
  myTeams: null,
  myTeamsError: undefined,
  myTeamsStatus: StateStatus.PENDING,
  createOrganizationTeamError: undefined,
  createOrganizationTeamStatus: StateStatus.PENDING,
  deleteTeamError: undefined,
  deleteTeamStatus: StateStatus.PENDING,
};

export const teamReducer = createReducer(
  initialState,

  //Handle loading organization teams
  on(loadOrganizationTeams, (state) => ({
    ...state,
    organizationTeamsError: null,
    organizationTeamsStatus: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadOrganizationTeamsSuccess, (state, { teams }) => ({
    ...state,
    organizationTeams: teams,
    organizationTeamsError: null,
    organizationTeamsStatus: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadOrganizationTeamsFailure, (state, { error }) => ({
    ...state,
    organizationTeamsError: error,
    organizationTeamsStatus: StateStatus.ERROR,
  })),

  //Handle loading current user teams
  on(loadMyTeams, (state) => ({
    ...state,
    myTeamsError: null,
    myTeamsStatus: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadMyTeamsSuccess, (state, { teams }) => ({
    ...state,
    myTeams: teams,
    myTeamsError: null,
    myTeamsStatus: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadOrganizationTeamsFailure, (state, { error }) => ({
    ...state,
    myTeamsError: error,
    myTeamsStatus: StateStatus.ERROR,
  })),

  //Handle create new team
  on(createTeam, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle create new team success
  on(createTeamSuccess, (state, team) => ({
    ...state,
    organizationTeams: [...(state.organizationTeams || []), team],
    createOrganizationTeamError: null,
    createOrganizationTeamStatus: StateStatus.SUCCESS,
  })),

  //Handle create new team failure
  on(createTeamFailure, (state, { error }) => ({
    ...state,
    createOrganizationTeamError: error,
    createOrganizationTeamStatus: StateStatus.ERROR,
  })),

  on(deleteTeam, (state) => ({
    ...state,
    deleteTeamError: null,
    deleteTeamStatus: StateStatus.LOADING,
  })),

  on(deleteTeamSuccess, (state, { teamId }) => ({
    ...state,
    organizationTeams:
      state.organizationTeams?.filter((team) => team.teamId !== teamId) ?? null,
    deleteTeamError: null,
    deleteTeamStatus: StateStatus.SUCCESS,
  })),

  on(deleteTeamFailure, (state, { error }) => ({
    ...state,
    deleteTeamError: error,
    deleteTeamStatus: StateStatus.ERROR,
  })),
);
