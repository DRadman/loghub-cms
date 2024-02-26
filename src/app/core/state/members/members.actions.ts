import { createAction, props } from '@ngrx/store';
import { MembersDto } from '../../domain/dto/members.dto';
import { InvitationDto } from '../../domain/dto/invitation.dto';
import { InvitationRequestDto } from '../../domain/dto/requests/invitation-request.dto';
import { User } from '../../domain/models/user.entity';

export const loadOrganizationMembers = createAction(
  '[Members Settings Page] Load members',
);

export const loadOrganizationMembersSuccess = createAction(
  '[Members API] Get organization members success',
  props<MembersDto>(),
);

export const loadOrganizationMembersFailure = createAction(
  '[Members API] Get organization members failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const inviteMember = createAction(
  '[Members Settings Page] Invite member',
  props<InvitationRequestDto>(),
);

export const inviteMemberSuccess = createAction(
  '[Members API] Invite member success',
  props<InvitationDto>(),
);

export const inviteMemberFailure = createAction(
  '[Members API] Invite member failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const removeMember = createAction(
  '[Members Settings Page] Remove member',
  props<{ memberId: string }>(),
);

export const removeMemberSuccess = createAction(
  '[Members API] Remove member success',
);

export const removeMemberFailure = createAction(
  '[Members API] Remove member failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const loadActiveMembers = createAction(
  '[Members Picker] Load active members',
);

export const loadActiveMembersSuccess = createAction(
  '[Members API] Get organization active members success',
  props<{ members: User[] }>(),
);

export const loadActiveMembersFailure = createAction(
  '[Members API] Get organization active members failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);
