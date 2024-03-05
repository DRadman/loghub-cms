import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProjectService } from "../../services/api/project.api.service";
import { createProject, createProjectFailure, createProjectSuccess, loadAllProjects, loadAllProjectsFailure, loadAllProjectsSuccess, loadMyProjects, loadMyProjectsFailure, loadMyProjectsSuccess } from "./project.actions";
import { Injectable } from "@angular/core";
import { switchMap, map, catchError, of } from "rxjs";

@Injectable()
export class ProjectEffects {
  constructor(
    private projectService: ProjectService,
    private actions$: Actions,
  ) {}

  loadAllProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllProjects),
      switchMap(() =>
        this.projectService.getAllProjects().pipe(
          map((projects) => loadAllProjectsSuccess({projects: projects})),
          catchError((error) => of(loadAllProjectsFailure({ error }))),
        ),
      ),
    ),
  );

  loadMyProjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMyProjects),
      switchMap((request) =>
        this.projectService.getMyProjects(request.teamIds).pipe(
          map((projects) => loadMyProjectsSuccess({projects: projects})),
          catchError((error) => of(loadMyProjectsFailure({ error }))),
        ),
      ),
    ),
  );


  createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProject),
      switchMap((request) =>
        this.projectService.createProject(request).pipe(
          map((project) => createProjectSuccess(project)),
          catchError((error) => of(createProjectFailure({ error }))),
        ),
      ),
    ),
  );
}
