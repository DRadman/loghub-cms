import { createSelector } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { AppState } from '../app.state';
import { ProjectState } from './project.reducer';

export const selectProjectState = (state: AppState) => state.projectState;

export const isLoadingAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.allProjectsStatus == StateStatus.LOADING,
);

export const selectAllProjects = createSelector(
  selectProjectState,
  (state: ProjectState) => state.allProjects,
);

export const isLoadingCreateProject = createSelector(
  selectProjectState,
  (state: ProjectState) =>
    state.createProjectStatus == StateStatus.LOADING,
);

export const selectCreateProjectStatus = createSelector(
  selectProjectState,
  (state: ProjectState) => state.createProjectStatus,
);
