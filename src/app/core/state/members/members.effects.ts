import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
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
import { MembersService } from '../../services/api/members.api.service';
import { Injectable } from '@angular/core';
import { InvitationService } from '../../services/api/invitation.api.service';

@Injectable()
export class MembersEffects {
  constructor(
    private membersService: MembersService,
    private invitationService: InvitationService,
    private actions$: Actions,
  ) {}

  loadOrganizationMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizationMembers),
      switchMap(() =>
        this.membersService.getMembers().pipe(
          map((members) => loadOrganizationMembersSuccess(members)),
          catchError((error) => of(loadOrganizationMembersFailure({ error }))),
        ),
      ),
    ),
  );

  loadActiveMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadActiveMembers),
      switchMap(() =>
        this.membersService.getActiveMembers().pipe(
          map((members) => loadActiveMembersSuccess({members: members})),
          catchError((error) => of(loadActiveMembersFailure({ error }))),
        ),
      ),
    ),
  );

  inviteMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(inviteMember),
      switchMap((request) =>
        this.invitationService.inviteMember(request).pipe(
          map((invitation) => inviteMemberSuccess(invitation)),
          catchError((error) => of(inviteMemberFailure({ error }))),
        ),
      ),
    ),
  );

  removeMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeMember),
      switchMap((request) =>
        this.membersService.removeMember(request.memberId).pipe(
          map(() => removeMemberSuccess()),
          catchError((error) => of(removeMemberFailure({ error }))),
        ),
      ),
    ),
  );

  removeMemberSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeMemberSuccess),
      switchMap(
        () => of(loadOrganizationMembers()), // Dispatch loadOrganizationMembers action after successful removal
      ),
    ),
  );
}
