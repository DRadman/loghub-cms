import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PlatformService } from '../../services/api/platform.api.service';
import {
  loadPlatforms,
  loadPlatformsFailure,
  loadPlatformsSuccess,
} from './platform.actions';

@Injectable()
export class PlatformEffects {
  constructor(
    private platformService: PlatformService,
    private actions$: Actions,
  ) {}

  loadPlatforms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPlatforms),
      switchMap(() =>
        this.platformService.getPlatforms().pipe(
          map((result) => loadPlatformsSuccess({ platforms: result })),
          catchError((error) => of(loadPlatformsFailure({ error }))),
        ),
      ),
    ),
  );
}
