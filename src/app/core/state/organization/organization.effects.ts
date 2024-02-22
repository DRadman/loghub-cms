import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrganizationService } from "../../services/api/organization.api.service";
import { createOrganization, createOrganizationSuccess, loadCurrentOrganization, loadCurrentOrganizationFailure, loadCurrentOrganizationSuccess, updateOrganizationPicture, updateOrganizationPictureFailure, updateOrganizationPictureSuccess } from "./organization.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class OrganizationEffects {
  constructor(
    private organizationService: OrganizationService,
    private actions$: Actions,
  ) {}

  loadCurrentOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCurrentOrganization),
      switchMap(() =>
        this.organizationService.getOrganization().pipe(
          map((organization) => loadCurrentOrganizationSuccess(organization)),
          catchError((error) => of(loadCurrentOrganizationFailure({ error }))),
        ),
      ),
    ),
  );

  createNewOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createOrganization),
      switchMap((request) =>
        this.organizationService.createOrganization(request).pipe(
          map((organization) => createOrganizationSuccess(organization)),
          catchError((error) => of(loadCurrentOrganizationFailure({ error }))),
        ),
      ),
    ),
  );

  updateOrganizationPicture$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOrganizationPicture),
      switchMap((request) =>
        this.organizationService.updateOrganizationPicture(request.file).pipe(
          map((result) => updateOrganizationPictureSuccess(result)),
          catchError((error) => of(updateOrganizationPictureFailure({ error }))),
        ),
      ),
    ),
  );
}
