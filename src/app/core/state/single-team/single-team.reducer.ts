import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Team } from '../../domain/models/team.entity';
import {
    addTeamMembers,
  addTeamMembersFailure,
  addTeamMembersSuccess,
  addTeamProjects,
  addTeamProjectsFailure,
  addTeamProjectsSuccess,
  loadTeamById,
  loadTeamByIdFailure,
  loadTeamByIdSuccess,
  loadTeamMembers,
  loadTeamMembersFailure,
  loadTeamMembersSuccess,
  loadTeamProjects,
  loadTeamProjectsFailure,
  loadTeamProjectsSuccess,
  removeTeamMembers,
  removeTeamMembersFailure,
  removeTeamMembersSuccess,
  removeTeamProjects,
  removeTeamProjectsFailure,
  removeTeamProjectsSuccess,
  resetSingleTeamState,
  updateTeam,
  updateTeamFailure,
  updateTeamSuccess,
} from './single-team.actions';
import { User } from '../../domain/models/user.entity';
import { Project } from '../../domain/models/project.entity';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SingleTeamState {
  singleTeam: Team | null;
  members: User[] | null;
  projects: Project[] | null;
  singleTeamError: any | null;
  membersError: any | null;
  updateTeamError: any | null;
  projectsError: any | null;
  addMembersError: any | null;
  removeMembersError: any | null;
  addProjectsError: any | null;
  removeProjectsError: any | null;
  singleTeamStatus: StateStatus;
  membersStatus: StateStatus;
  projectsStatus: StateStatus;
  updateTeamStatus: StateStatus;
  addMembersStatus: StateStatus;
  removeMembersStatus: StateStatus;
  addProjectsStatus: StateStatus;
  removeProjectsStatus: StateStatus;
}

export const initialState: SingleTeamState = {
    singleTeam: null,
    singleTeamError: undefined,
    updateTeamError: undefined,
    singleTeamStatus: StateStatus.PENDING,
    updateTeamStatus: StateStatus.PENDING,
    members: null,
    membersError: undefined,
    membersStatus: StateStatus.PENDING,
    projects: null,
    projectsError: undefined,
    projectsStatus: StateStatus.PENDING,
    addMembersError: undefined,
    removeMembersError: undefined,
    addProjectsError: undefined,
    removeProjectsError: undefined,
    addMembersStatus: StateStatus.PENDING,
    removeMembersStatus: StateStatus.PENDING,
    addProjectsStatus: StateStatus.PENDING,
    removeProjectsStatus: StateStatus.PENDING
};

export const singleTeamReducer = createReducer(
  initialState,

  on(resetSingleTeamState, () => (initialState)),

  on(loadTeamById, (state) => ({
    ...state,
    singleTeamError: null,
    singleTeamStatus: StateStatus.LOADING,
  })),

  on(loadTeamByIdSuccess, (state, { team }) => ({
    ...state,
    singleTeam: team,
    singleTeamError: null,
    singleTeamStatus: StateStatus.SUCCESS,
  })),

  on(loadTeamByIdFailure, (state, { error }) => ({
    ...state,
    singleTeamError: error,
    singleTeamStatus: StateStatus.ERROR,
  })),

  on(loadTeamMembers, (state) => ({
    ...state,
    membersError: null,
    membersStatus: StateStatus.LOADING,
  })),

  on(loadTeamMembersSuccess, (state, { members }) => ({
    ...state,
    members: members,
    membersError: null,
    membersStatus: StateStatus.SUCCESS,
  })),

  on(loadTeamMembersFailure, (state, { error }) => ({
    ...state,
    membersError: error,
    membersStatus: StateStatus.ERROR,
  })),
  
  on(loadTeamProjects, (state) => ({
    ...state,
    projectsError: null,
    projectsStatus: StateStatus.LOADING,
  })),

  on(loadTeamProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects: projects,
    projectsError: null,
    projectsStatus: StateStatus.SUCCESS,
  })),

  on(loadTeamProjectsFailure, (state, { error }) => ({
    ...state,
    projectsError: error,
    projectsStatus: StateStatus.ERROR,
  })),

  on(updateTeam, (state) => ({
    ...state,
    updateTeamError: null,
    updateTeamStatus: StateStatus.LOADING,
  })),

  on(updateTeamSuccess, (state, { team }) => ({
    ...state,
    singleTeam: team,
    updateTeamError: null,
    updateTeamStatus: StateStatus.SUCCESS,
  })),

  on(updateTeamFailure, (state, { error }) => ({
    ...state,
    updateTeamError: error,
    updateTeamStatus: StateStatus.ERROR,
  })),

  on(addTeamMembers, (state) => ({
    ...state,
    addMembersError: null,
    addMembersStatus: StateStatus.LOADING,
  })),

  on(addTeamMembersSuccess, (state, { members }) => ({
    ...state,
    members: members,
    addMembersError: null,
    addMembersStatus: StateStatus.SUCCESS,
  })),

  on(addTeamMembersFailure, (state, { error }) => ({
    ...state,
    addMembersError: error,
    addMembersStatus: StateStatus.ERROR,
  })),

  on(removeTeamMembers, (state) => ({
    ...state,
    removeMembersError: null,
    removeMembersStatus: StateStatus.LOADING,
  })),

  on(removeTeamMembersSuccess, (state, { members }) => ({
    ...state,
    members: members,
    removeMembersError: null,
    removeMembersStatus: StateStatus.SUCCESS,
  })),

  on(removeTeamMembersFailure, (state, { error }) => ({
    ...state,
    removeMembersError: error,
    removeMembersStatus: StateStatus.ERROR,
  })),


  on(addTeamProjects, (state) => ({
    ...state,
    addProjectsError: null,
    addProjectsStatus: StateStatus.LOADING,
  })),

  on(addTeamProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects: projects,
    addProjectsError: null,
    addProjectsStatus: StateStatus.SUCCESS,
  })),

  on(addTeamProjectsFailure, (state, { error }) => ({
    ...state,
    addProjectsError: error,
    addProjectsStatus: StateStatus.ERROR,
  })),

  on(removeTeamProjects, (state) => ({
    ...state,
    removeProjectsError: null,
    removeProjectsStatus: StateStatus.LOADING,
  })),

  on(removeTeamProjectsSuccess, (state, { projects }) => ({
    ...state,
    projects: projects,
    removeProjectsError: null,
    removeProjectsStatus: StateStatus.SUCCESS,
  })),

  on(removeTeamProjectsFailure, (state, { error }) => ({
    ...state,
    removeProjectsError: error,
    removeProjectsStatus: StateStatus.ERROR,
  })),
);
