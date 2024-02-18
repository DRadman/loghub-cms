import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MembersState } from './members.reducer';
import { StateStatus } from '../../domain/models/enums/state-status.enum';

export const selectMembers = (state: AppState) => state.membersState;

export const selectActiveMembers = createSelector(
  selectMembers,
  (state: MembersState) => state.members?.users,
);

export const selectInvitedMembers = createSelector(
  selectMembers,
  (state: MembersState) => state.members?.invitations,
);

export const selectOwner = createSelector(
  selectMembers,
  (state: MembersState) => state.members?.owner,
);

export const selectOwnerAsArray = createSelector(selectOwner, (owner) =>
  owner ? [owner] : [],
);

export const isLoadingMembers = createSelector(
  selectMembers,
  (state: MembersState) => state.status == StateStatus.LOADING,
);

export const isLoadingSendInvitation = createSelector(
  selectMembers,
  (state: MembersState) => state.invitationStatus == StateStatus.LOADING,
);

export const isLoadingRemoveMembers = createSelector(
    selectMembers,
    (state: MembersState) => state.removeMemberStatus == StateStatus.LOADING,
  );

export const selectInvitationSendStatus = createSelector(
  selectMembers,
  (state: MembersState) => state.invitationStatus,
);

export const selectRemoveMemberStatus = createSelector(
  selectMembers,
  (state: MembersState) => state.removeMemberStatus,
);
