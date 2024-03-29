import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Project } from '../../domain/models/project.entity';
import { createProject, createProjectFailure, createProjectSuccess, loadAllProjects, loadAllProjectsFailure, loadAllProjectsSuccess, loadMyProjects, loadMyProjectsFailure, loadMyProjectsSuccess } from './project.actions';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ProjectState {
  allProjects: Project[] | null;
  myProjects: Project[] | null;
  allProjectsError: any | null;
  createProjectError: any | null;
  myProjectsError: any | null;
  allProjectsStatus: StateStatus;
  createProjectStatus: StateStatus;
  myProjectsStatus: StateStatus
}

export const initialState: ProjectState = {
  allProjects: null,
  myProjects: null,
  allProjectsError: undefined,
  allProjectsStatus: StateStatus.PENDING,
  createProjectError: undefined,
  createProjectStatus: StateStatus.PENDING,
  myProjectsError: undefined,
  myProjectsStatus: StateStatus.PENDING,
};

export const projectReducer = createReducer(
  initialState,

  //Handle loading all projects
  on(loadAllProjects, (state) => ({
    ...state,
    allProjectsError: null,
    allProjectsStatus: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadAllProjectsSuccess, (state, {projects}) => ({
    ...state,
    allProjects: projects,
    allProjectsError: null,
    allProjectsStatus: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadAllProjectsFailure, (state, { error }) => ({
    ...state,
    allProjectsError: error,
    allProjectsStatus: StateStatus.ERROR,
  })),

  //Handle loading my projects
  on(loadMyProjects, (state) => ({
    ...state,
    myProjectsError: null,
    myProjectsStatus: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadMyProjectsSuccess, (state, {projects}) => ({
    ...state,
    myProjects: projects,
    myProjectsError: null,
    myProjectsStatus: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadMyProjectsFailure, (state, { error }) => ({
    ...state,
    myProjectsError: error,
    myProjectsStatus: StateStatus.ERROR,
  })),

  //Handle create new team
  on(createProject, (state) => ({
    ...state,
    createProjectError: null,
    createProjectStatus: StateStatus.LOADING,
  })),

  //Handle create new team success
  on(createProjectSuccess, (state, project) => ({
    ...state,
    allProjects: [...(state.allProjects || []), project],
    createProjectError: null,
    createProjectStatus: StateStatus.SUCCESS,
  })),

  //Handle create new team failure
  on(createProjectFailure, (state, { error }) => ({
    ...state,
    createProjectError: error,
    createProjectStatus: StateStatus.ERROR,
  })),
);
