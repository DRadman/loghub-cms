import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Project } from '../../domain/models/project.entity';
import {
  addProjectDebugFile,
  addProjectDebugFileFailure,
  addProjectDebugFileSuccess,
  addProjectEnvironments,
  addProjectEnvironmentsFailure,
  addProjectEnvironmentsSuccess,
  addProjectRelease,
  addProjectReleaseFailure,
  addProjectReleaseSuccess,
  addProjectTags,
  addProjectTagsFailure,
  addProjectTagsSuccess,
  addProjectTeams,
  addProjectTeamsFailure,
  addProjectTeamsSuccess,
  loadProjectById,
  loadProjectByIdFailure,
  loadProjectByIdSuccess,
  loadProjectDebugFiles,
  loadProjectDebugFilesFailure,
  loadProjectDebugFilesSuccess,
  loadProjectEnvironments,
  loadProjectEnvironmentsFailure,
  loadProjectEnvironmentsSuccess,
  loadProjectReleases,
  loadProjectReleasesFailure,
  loadProjectReleasesSuccess,
  loadProjectTags,
  loadProjectTagsFailure,
  loadProjectTagsSuccess,
  loadProjectTeams,
  loadProjectTeamsFailure,
  loadProjectTeamsSuccess,
  removeProjectDebugFiles,
  removeProjectDebugFilesFailure,
  removeProjectDebugFilesSuccess,
  removeProjectEnvironments,
  removeProjectEnvironmentsFailure,
  removeProjectEnvironmentsSuccess,
  removeProjectReleases,
  removeProjectReleasesFailure,
  removeProjectReleasesSuccess,
  removeProjectTags,
  removeProjectTagsFailure,
  removeProjectTagsSuccess,
  removeProjectTeams,
  removeProjectTeamsFailure,
  removeProjectTeamsSuccess,
  resetSingleProjectState,
  updateProject,
  updateProjectFailure,
  updateProjectSucess,
} from './single-project.actions';
import { Team } from '../../domain/models/team.entity';
import { ProjectRelease } from '../../domain/models/project-release.entity';
import { ProjectDebugFile } from '../../domain/models/project-debug-file.entity';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SingleProjectState {
  singleProject: Project | null;
  teams: Team[] | null;
  tags: string[] | null;
  environments: string[] | null;
  releases: ProjectRelease[] | null;
  debugFiles: ProjectDebugFile[] | null;
  tagsError: any | null;
  environmentsError: any | null;
  releasesError: any | null;
  debugFilesError: any | null;
  singleProjectError: any | null;
  updateProjectError: any | null;
  addTeamsError: any | null;
  removeTeamsError: any | null;
  removeTagsError: any | null;
  removeEnvironmentsError: any | null;
  addTagsError: any | null;
  addEnvironmentsError: any | null;
  addReleaseError: any | null;
  removeReleasesError: any | null;
  addDebugFileError: any | null;
  removeDebugFilesError: any | null;
  teamsError: any | null;
  teamsStatus: StateStatus;
  singleProjectStatus: StateStatus;
  updateProjectStatus: StateStatus;
  addTeamsStatus: StateStatus;
  removeTeamsStatus: StateStatus;
  tagsStatus: StateStatus;
  releasesStatus: StateStatus;
  environmentsStatus: StateStatus;
  debugFilesStatus: StateStatus;
  removeTagsStatus: StateStatus;
  removeEnvironmentsStatus: StateStatus;
  addTagsStatus: StateStatus;
  addEnvironmentsStatus: StateStatus;
  addReleaseStatus: StateStatus;
  removeReleasesStatus: StateStatus;
  addDebugFileStatus: StateStatus;
  removeDebugFilesStatus: StateStatus;
}

export const initialState: SingleProjectState = {
  singleProject: null,
  teams: null,
  tags: null,
  environments: null,
  releases: null,
  debugFiles: null,
  singleProjectError: undefined,
  singleProjectStatus: StateStatus.PENDING,
  updateProjectError: undefined,
  updateProjectStatus: StateStatus.PENDING,
  teamsError: undefined,
  teamsStatus: StateStatus.PENDING,
  addTeamsError: undefined,
  addTeamsStatus: StateStatus.PENDING,
  removeTeamsError: undefined,
  removeTeamsStatus: StateStatus.PENDING,
  environmentsError: undefined,
  environmentsStatus: StateStatus.PENDING,
  tagsError: undefined,
  tagsStatus: StateStatus.PENDING,
  releasesError: undefined,
  releasesStatus: StateStatus.PENDING,
  debugFilesError: undefined,
  debugFilesStatus: StateStatus.PENDING,
  addTagsError: undefined,
  addTagsStatus: StateStatus.PENDING,
  removeTagsError: undefined,
  removeTagsStatus: StateStatus.PENDING,
  addEnvironmentsError: undefined,
  addEnvironmentsStatus: StateStatus.PENDING,
  removeEnvironmentsError: undefined,
  removeEnvironmentsStatus: StateStatus.PENDING,
  addReleaseError: undefined,
  addReleaseStatus: StateStatus.PENDING,
  removeReleasesError: undefined,
  removeReleasesStatus: StateStatus.PENDING,
  addDebugFileError: undefined,
  addDebugFileStatus: StateStatus.PENDING,
  removeDebugFilesError: undefined,
  removeDebugFilesStatus: StateStatus.PENDING,
};

export const singleProjectReducer = createReducer(
  initialState,

  on(resetSingleProjectState, () => initialState),

  on(loadProjectById, (state) => ({
    ...state,
    singleProjectError: null,
    singleProjectStatus: StateStatus.LOADING,
  })),

  on(loadProjectByIdSuccess, (state, { project }) => ({
    ...state,
    singleProject: project,
    singleProjectError: null,
    singleProjectStatus: StateStatus.SUCCESS,
  })),

  on(loadProjectByIdFailure, (state, { error }) => ({
    ...state,
    singleProjectError: error,
    singleProjectStatus: StateStatus.ERROR,
  })),

  on(updateProject, (state) => ({
    ...state,
    updateProjectError: null,
    updateProjectStatus: StateStatus.LOADING,
  })),

  on(updateProjectSucess, (state, { project }) => ({
    ...state,
    singleProject: project,
    updateProjectError: null,
    updateProjectStatus: StateStatus.SUCCESS,
  })),

  on(updateProjectFailure, (state, { error }) => ({
    ...state,
    updateProjectError: error,
    updateProjectStatus: StateStatus.ERROR,
  })),

  on(loadProjectTeams, (state) => ({
    ...state,
    teamsError: null,
    teamsStatus: StateStatus.LOADING,
  })),

  on(loadProjectTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams: teams,
    teamsError: null,
    teamsStatus: StateStatus.SUCCESS,
  })),

  on(loadProjectTeamsFailure, (state, { error }) => ({
    ...state,
    teamsError: error,
    teamsStatus: StateStatus.ERROR,
  })),

  on(addProjectTeams, (state) => ({
    ...state,
    addTeamsError: null,
    addTeamsStatus: StateStatus.LOADING,
  })),

  on(addProjectTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams: teams,
    addTeamsError: null,
    addTeamsStatus: StateStatus.SUCCESS,
  })),

  on(addProjectTeamsFailure, (state, { error }) => ({
    ...state,
    addTeamsError: error,
    addTeamsStatus: StateStatus.ERROR,
  })),

  on(removeProjectTeams, (state) => ({
    ...state,
    removeTeamsError: null,
    removeTeamsStatus: StateStatus.LOADING,
  })),

  on(removeProjectTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams: teams,
    removeTeamsError: null,
    removeTeamsStatus: StateStatus.SUCCESS,
  })),

  on(removeProjectTeamsFailure, (state, { error }) => ({
    ...state,
    removeTeamsError: error,
    removeTeamsStatus: StateStatus.ERROR,
  })),

  on(loadProjectTags, (state) => ({
    ...state,
    tagsError: null,
    tagsStatus: StateStatus.LOADING,
  })),

  on(loadProjectTagsSuccess, (state, { tags }) => ({
    ...state,
    tags: tags,
    tagsError: null,
    tagsStatus: StateStatus.SUCCESS,
  })),

  on(loadProjectTagsFailure, (state, { error }) => ({
    ...state,
    tagsError: error,
    tagsStatus: StateStatus.ERROR,
  })),

  on(loadProjectEnvironments, (state) => ({
    ...state,
    environmentsError: null,
    environmentsStatus: StateStatus.LOADING,
  })),

  on(loadProjectEnvironmentsSuccess, (state, { environments }) => ({
    ...state,
    environments: environments,
    environmentsError: null,
    environmentsStatus: StateStatus.SUCCESS,
  })),

  on(loadProjectEnvironmentsFailure, (state, { error }) => ({
    ...state,
    environmentsError: error,
    environmentsStatus: StateStatus.ERROR,
  })),

  on(loadProjectReleases, (state) => ({
    ...state,
    releasesError: null,
    releasesStatus: StateStatus.LOADING,
  })),

  on(loadProjectReleasesSuccess, (state, { releases }) => ({
    ...state,
    releases: releases,
    releasesError: null,
    releasesStatus: StateStatus.SUCCESS,
  })),

  on(loadProjectReleasesFailure, (state, { error }) => ({
    ...state,
    releasesError: error,
    releasesStatus: StateStatus.ERROR,
  })),

  on(loadProjectDebugFiles, (state) => ({
    ...state,
    debugFilesError: null,
    debugFilesStatus: StateStatus.LOADING,
  })),

  on(loadProjectDebugFilesSuccess, (state, { debugFiles }) => ({
    ...state,
    debugFiles: debugFiles,
    debugFilesError: null,
    debugFilesStatus: StateStatus.SUCCESS,
  })),

  on(loadProjectDebugFilesFailure, (state, { error }) => ({
    ...state,
    debugFilesError: error,
    debugFilesStatus: StateStatus.ERROR,
  })),

  on(removeProjectTags, (state) => ({
    ...state,
    removeTagsError: null,
    removeTagsStatus: StateStatus.LOADING,
  })),

  on(removeProjectTagsSuccess, (state, { tags }) => ({
    ...state,
    tags: tags,
    removeTagsError: null,
    removeTagsStatus: StateStatus.SUCCESS,
  })),

  on(removeProjectTagsFailure, (state, { error }) => ({
    ...state,
    removeTagsError: error,
    removeTagsStatus: StateStatus.ERROR,
  })),

  on(addProjectTags, (state) => ({
    ...state,
    addTagsError: null,
    addTagsStatus: StateStatus.LOADING,
  })),

  on(addProjectTagsSuccess, (state, { tags }) => ({
    ...state,
    tags: tags,
    addTagsError: null,
    addTagsStatus: StateStatus.SUCCESS,
  })),

  on(addProjectTagsFailure, (state, { error }) => ({
    ...state,
    addTagsError: error,
    addTagsStatus: StateStatus.ERROR,
  })),

  on(removeProjectEnvironments, (state) => ({
    ...state,
    removeEnvironmentsError: null,
    removeEnvironmentsStatus: StateStatus.LOADING,
  })),

  on(removeProjectEnvironmentsSuccess, (state, { environments }) => ({
    ...state,
    environments: environments,
    removeEnvironmentsError: null,
    removeEnvironmentsStatus: StateStatus.SUCCESS,
  })),

  on(removeProjectEnvironmentsFailure, (state, { error }) => ({
    ...state,
    removeEnvironmentsError: error,
    removeEnvironmentsStatus: StateStatus.ERROR,
  })),

  on(addProjectEnvironments, (state) => ({
    ...state,
    addEnvironmentsError: null,
    addEnvironmentsStatus: StateStatus.LOADING,
  })),

  on(addProjectEnvironmentsSuccess, (state, { environments }) => ({
    ...state,
    environments: environments,
    addEnvironmentsError: null,
    addEnvironmentsStatus: StateStatus.SUCCESS,
  })),

  on(addProjectEnvironmentsFailure, (state, { error }) => ({
    ...state,
    addEnvironmentsError: error,
    addEnvironmentsStatus: StateStatus.ERROR,
  })),

  on(removeProjectReleases, (state) => ({
    ...state,
    removeReleasesError: null,
    removeReleasesStatus: StateStatus.LOADING,
  })),

  on(removeProjectReleasesSuccess, (state, { releases }) => ({
    ...state,
    releases: releases,
    removeReleasesError: null,
    removeReleasesStatus: StateStatus.SUCCESS,
  })),

  on(removeProjectReleasesFailure, (state, { error }) => ({
    ...state,
    removeReleasesError: error,
    removeReleasesStatus: StateStatus.ERROR,
  })),

  on(addProjectRelease, (state) => ({
    ...state,
    addReleaseError: null,
    addReleaseStatus: StateStatus.LOADING,
  })),

  on(addProjectReleaseSuccess, (state, { releases }) => ({
    ...state,
    releases: releases,
    addReleaseError: null,
    addReleaseStatus: StateStatus.SUCCESS,
  })),

  on(addProjectReleaseFailure, (state, { error }) => ({
    ...state,
    addReleaseError: error,
    addReleaseStatus: StateStatus.ERROR,
  })),

  //HERE
  on(removeProjectDebugFiles, (state) => ({
    ...state,
    removeDebugFilesError: null,
    removeDebugFilesStatus: StateStatus.LOADING,
  })),

  on(removeProjectDebugFilesSuccess, (state, { debugFiles }) => ({
    ...state,
    debugFiles: debugFiles,
    removeDebugFilesError: null,
    removeDebugFilesStatus: StateStatus.SUCCESS,
  })),

  on(removeProjectDebugFilesFailure, (state, { error }) => ({
    ...state,
    removeDebugFilesError: error,
    removeDebugFilesStatus: StateStatus.ERROR,
  })),

  on(addProjectDebugFile, (state) => ({
    ...state,
    addDebugFileError: null,
    addDebugFileStatus: StateStatus.LOADING,
  })),

  on(addProjectDebugFileSuccess, (state, { debugFiles }) => ({
    ...state,
    debugFiles: debugFiles,
    addDebugFileError: null,
    addDebugFileStatus: StateStatus.SUCCESS,
  })),

  on(addProjectDebugFileFailure, (state, { error }) => ({
    ...state,
    addDebugFileError: error,
    addDebugFileStatus: StateStatus.ERROR,
  })),

);
