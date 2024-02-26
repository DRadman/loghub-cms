import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { SingleTeamState } from './single-team.reducer';
import { StateStatus } from '../../domain/models/enums/state-status.enum';

export const selectSingleTeamState = (state: AppState) => state.singleTeamState;

export const selectSingleTeam = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.singleTeam,
);

export const selectSingleTeamMembers = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.members,
);

export const isLoadingTeamMembers = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.membersStatus == StateStatus.LOADING,
);

export const isLoadingUpdateTeam = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.updateTeamStatus == StateStatus.LOADING,
);

export const selectUpdateTeamStatus = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.updateTeamStatus,
);

export const selectSingleTeamProjects = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.projects,
);

export const isLoadingTeamProjects = createSelector(
  selectSingleTeamState,
  (state: SingleTeamState) => state.projectsStatus == StateStatus.LOADING,
);
