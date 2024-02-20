import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, map, catchError, of } from "rxjs";
import { TeamService } from "../../services/api/team.api.service";
import { createTeam, createTeamFailure, createTeamSuccess, loadMyTeams, loadMyTeamsFailure, loadMyTeamsSuccess, loadOrganizationTeams, loadOrganizationTeamsFailure, loadOrganizationTeamsSuccess } from "./team.actions";

@Injectable()
export class TeamEffects {
  constructor(
    private teamService: TeamService,
    private actions$: Actions,
  ) {}

  loadOrganizationTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrganizationTeams),
      switchMap(() =>
        this.teamService.getOrganizationTeams().pipe(
          map((teams) => loadOrganizationTeamsSuccess({teams: teams})),
          catchError((error) => of(loadOrganizationTeamsFailure({ error }))),
        ),
      ),
    ),
  );

  loadMyTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMyTeams),
      switchMap(() =>
        this.teamService.getMyTeams().pipe(
          map((teams) => loadMyTeamsSuccess({teams: teams})),
          catchError((error) => of(loadMyTeamsFailure({ error }))),
        ),
      ),
    ),
  );

  createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTeam),
      switchMap((request) =>
        this.teamService.createNewTeam(request).pipe(
          map((team) => createTeamSuccess(team)),
          catchError((error) => of(createTeamFailure({ error }))),
        ),
      ),
    ),
  );
}
