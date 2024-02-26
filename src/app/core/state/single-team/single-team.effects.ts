import { Injectable } from '@angular/core';
import { TeamService } from '../../services/api/team.api.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
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
  updateTeam,
  updateTeamFailure,
  updateTeamSuccess,
} from './single-team.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class SingleTeamEffects {
  constructor(
    private teamService: TeamService,
    private actions$: Actions,
  ) {}

  loadTeamById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamById),
      switchMap((args) =>
        this.teamService.getTeamById(args.teamId).pipe(
          map((team) => loadTeamByIdSuccess({ team: team })),
          catchError((error) => of(loadTeamByIdFailure({ error }))),
        ),
      ),
    ),
  );

  loadTeamMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamMembers),
      switchMap((args) =>
        this.teamService.getTeamMembers(args.teamId).pipe(
          map((members) => loadTeamMembersSuccess({ members: members })),
          catchError((error) => of(loadTeamMembersFailure({ error }))),
        ),
      ),
    ),
  );

  loadTeamProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamProjects),
      switchMap((args) =>
        this.teamService.getTeamProjects(args.teamId).pipe(
          map((projects) => loadTeamProjectsSuccess({ projects: projects })),
          catchError((error) => of(loadTeamProjectsFailure({ error }))),
        ),
      ),
    ),
  );

  updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTeam),
      switchMap((args) =>
        this.teamService.updateTeam(args.teamId, args.dto).pipe(
          map((team) => updateTeamSuccess({ team: team })),
          catchError((error) => of(updateTeamFailure({ error }))),
        ),
      ),
    ),
  );

  addTeamMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTeamMembers),
      switchMap((args) =>
        this.teamService.addTeamMembers(args.teamId, args.ids).pipe(
          map((members) => addTeamMembersSuccess({ members: members })),
          catchError((error) => of(addTeamMembersFailure({ error }))),
        ),
      ),
    ),
  );

  removeTeamMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTeamMembers),
      switchMap((args) =>
        this.teamService.removeTeamMembers(args.teamId, args.ids).pipe(
          map((members) => removeTeamMembersSuccess({ members: members })),
          catchError((error) => of(removeTeamMembersFailure({ error }))),
        ),
      ),
    ),
  );

  addTeamProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTeamProjects),
      switchMap((args) =>
        this.teamService.addTeamProjects(args.teamId, args.ids).pipe(
          map((projects) => addTeamProjectsSuccess({ projects: projects })),
          catchError((error) => of(addTeamProjectsFailure({ error }))),
        ),
      ),
    ),
  );

  removeTeamProjectss$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTeamProjects),
      switchMap((args) =>
        this.teamService.removeTeamProjects(args.teamId, args.ids).pipe(
          map((projects) => removeTeamProjectsSuccess({ projects: projects })),
          catchError((error) => of(removeTeamProjectsFailure({ error }))),
        ),
      ),
    ),
  );
}
