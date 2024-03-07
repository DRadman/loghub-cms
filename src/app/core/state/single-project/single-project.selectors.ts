import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { SingleProjectState } from "./single-project.reducer";
import { StateStatus } from "../../domain/models/enums/state-status.enum";

export const selectSingleProjectState = (state: AppState) => state.singleProjectState;

export const selectSingleProject = createSelector(
    selectSingleProjectState,
  (state: SingleProjectState) => state.singleProject,
);

export const selectSingleProjectTeams = createSelector(
  selectSingleProjectState,
(state: SingleProjectState) => state.teams,
);

export const selectSingleProjectTags = createSelector(
  selectSingleProjectState,
(state: SingleProjectState) => state.tags,
);

export const selectSingleProjectEnvironments = createSelector(
  selectSingleProjectState,
(state: SingleProjectState) => state.environments,
);

export const selectSingleProjectReleases = createSelector(
  selectSingleProjectState,
(state: SingleProjectState) => state.releases,
);

export const selectSingleProjectDebugFiles = createSelector(
  selectSingleProjectState,
(state: SingleProjectState) => state.debugFiles,
);

export const isLoadingUpdateProject = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.updateProjectStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectTeams = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.teamsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectTags = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.tagsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectEnvironments = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.environmentsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectReleases = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.releasesStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectAddTags = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addTagsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectRemoveTags = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addTagsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectAddDebugFile = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addDebugFileStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectRemoveDebugFiles = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.removeDebugFilesStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectAddEnvironments = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addEnvironmentsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectRemoveEnvironments = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addEnvironmentsStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectAddRelease = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addReleaseStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectRemoveReleases = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addReleaseStatus == StateStatus.LOADING,
);

export const isLoadingSingleProjectDebugFiles = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.debugFilesStatus == StateStatus.LOADING,
);

export const selectUpdateProjectStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.updateProjectStatus,
);

export const selectRemoveProjectTagsStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.removeTagsStatus,
);

export const selectAddProjectTagsStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addTagsStatus,
);

export const selectRemoveProjectEnvironmentsStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.removeEnvironmentsStatus,
);

export const selectAddProjectEnvironmentsStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addEnvironmentsStatus,
);

export const selectRemoveProjectReleasesStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.removeReleasesStatus,
);

export const selectAddProjectReleaseStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addReleaseStatus,
);

export const selectRemoveProjectDebugFilesStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.removeDebugFilesStatus,
);

export const selectAddProjectDebugFileStatus = createSelector(
  selectSingleProjectState,
  (state: SingleProjectState) => state.addDebugFileStatus,
);