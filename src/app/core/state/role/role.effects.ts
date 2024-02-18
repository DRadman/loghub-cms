import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { RoleService } from '../../services/api/role.api.service';
import { loadRoles, loadRolesFailure, loadRolesSuccess } from './role.actions';

@Injectable()
export class RoleEffects {
  constructor(
    private roleService: RoleService,
    private actions$: Actions,
  ) {}

  loadRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRoles),
      switchMap(() =>
        this.roleService.getRoles().pipe(
          map((result) => loadRolesSuccess({ roles: result })),
          catchError((error) => of(loadRolesFailure({ error }))),
        ),
      ),
    ),
  );
}
