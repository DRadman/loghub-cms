import { createReducer, on } from '@ngrx/store';
import { MembersDto } from '../../domain/dto/members.dto';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Invitation } from '../../domain/models/invitation.entity';
import {
  inviteMember,
  inviteMemberFailure,
  inviteMemberSuccess,
  loadActiveMembers,
  loadActiveMembersFailure,
  loadActiveMembersSuccess,
  loadOrganizationMembers,
  loadOrganizationMembersFailure,
  loadOrganizationMembersSuccess,
  removeMember,
  removeMemberFailure,
  removeMemberSuccess,
} from './members.actions';
import { User } from '../../domain/models/user.entity';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MembersState {
  members: MembersDto | null;
  activeMembers: User[] | null;
  error: any | null;
  inviteMemberError: any | null;
  activeMembersError: any | null;
  removeMemberError: any | null;
  invitedMember: Invitation | null;
  status: StateStatus;
  invitationStatus: StateStatus;
  removeMemberStatus: StateStatus;
  activeMembersStatus: StateStatus;
}

export const initialState: MembersState = {
  members: null,
  activeMembers: null,
  error: undefined,
  inviteMemberError: null,
  invitedMember: null,
  removeMemberError: null,
  activeMembersError: null,
  status: StateStatus.PENDING,
  invitationStatus: StateStatus.PENDING,
  removeMemberStatus: StateStatus.PENDING,
  activeMembersStatus: StateStatus.PENDING,
};

export const membersReducer = createReducer(
  initialState,

  //Handle loading current organization members
  on(loadOrganizationMembers, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadOrganizationMembersSuccess, (state, members) => ({
    ...state,
    members: members,
    error: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadOrganizationMembersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),

  on(inviteMember, (state) => ({
    ...state,
    inviteMemberError: null,
    invitedMember: null,
    invitationStatus: StateStatus.LOADING,
  })),

  on(inviteMemberSuccess, (state, invitedMember) => ({
    ...state,
    invitedMember: invitedMember,
    members: {
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      owner: state.members?.owner!,
      invitations: [...(state.members?.invitations || []), invitedMember],
      users: state.members?.users || [],
    },
    inviteMemberError: null,
    invitationStatus: StateStatus.SUCCESS,
  })),

  on(inviteMemberFailure, (state, { error }) => ({
    ...state,
    inviteMemberError: error,
    invitationStatus: StateStatus.ERROR,
  })),

  on(removeMember, (state) => ({
    ...state,
    removeMemberError: null,
    removeMemberStatus: StateStatus.LOADING,
  })),

  on(removeMemberSuccess, (state) => ({
    ...state,
    removeMemberError: null,
    removeMemberStatus: StateStatus.SUCCESS,
  })),

  on(removeMemberFailure, (state, { error }) => ({
    ...state,
    removeMemberError: error,
    removeMemberStatus: StateStatus.ERROR,
  })),

  on(loadActiveMembers, (state) => ({
    ...state,
    activeMembersError: null,
    activeMembersStatus: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadActiveMembersSuccess, (state, { members }) => ({
    ...state,
    activeMembers: members,
    activeMembersError: null,
    activeMembersStatus: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadActiveMembersFailure, (state, { error }) => ({
    ...state,
    activeMembersError: error,
    activeMembersStatus: StateStatus.ERROR,
  })),
);
