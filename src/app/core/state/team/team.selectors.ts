import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { TeamState } from './team.reducer';
import { StateStatus } from '../../domain/models/enums/state-status.enum';

export const selectTeamState = (state: AppState) => state.teamState;

export const selectOrganizationTeams = createSelector(
  selectTeamState,
  (state: TeamState) => state.organizationTeams,
);

export const selectMyTeams = createSelector(
  selectTeamState,
  (state: TeamState) => state.myTeams,
);

export const isLoadingOrganizationTeams = createSelector(
  selectTeamState,
  (state: TeamState) => state.organizationTeamsStatus == StateStatus.LOADING,
);

export const isLoadingMyTeams = createSelector(
  selectTeamState,
  (state: TeamState) => state.myTeamsStatus == StateStatus.LOADING,
);

export const isLoadingDeleteTeam = createSelector(
  selectTeamState,
  (state: TeamState) => state.deleteTeamStatus == StateStatus.LOADING,
);

export const isLoadingCreateNewTeam = createSelector(
  selectTeamState,
  (state: TeamState) =>
    state.createOrganizationTeamStatus == StateStatus.LOADING,
);

export const selectCreateNewTeamStatus = createSelector(
  selectTeamState,
  (state: TeamState) => state.createOrganizationTeamStatus,
);

export const selectDeleteTeamStatus = createSelector(
  selectTeamState,
  (state: TeamState) => state.deleteTeamStatus,
);

