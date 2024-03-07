import { Injectable } from "@angular/core";
import { ProjectService } from "../../services/api/project.api.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addProjectDebugFile, addProjectDebugFileFailure, addProjectDebugFileSuccess, addProjectEnvironments, addProjectEnvironmentsFailure, addProjectEnvironmentsSuccess, addProjectRelease, addProjectReleaseFailure, addProjectReleaseSuccess, addProjectTags, addProjectTagsFailure, addProjectTagsSuccess, addProjectTeams, addProjectTeamsFailure, addProjectTeamsSuccess, loadProjectById, loadProjectByIdFailure, loadProjectByIdSuccess, loadProjectDebugFiles, loadProjectDebugFilesFailure, loadProjectDebugFilesSuccess, loadProjectEnvironments, loadProjectEnvironmentsFailure, loadProjectEnvironmentsSuccess, loadProjectReleases, loadProjectReleasesFailure, loadProjectReleasesSuccess, loadProjectTags, loadProjectTagsFailure, loadProjectTagsSuccess, loadProjectTeams, loadProjectTeamsFailure, loadProjectTeamsSuccess, removeProjectDebugFiles, removeProjectDebugFilesFailure, removeProjectDebugFilesSuccess, removeProjectEnvironments, removeProjectEnvironmentsFailure, removeProjectEnvironmentsSuccess, removeProjectReleases, removeProjectReleasesFailure, removeProjectReleasesSuccess, removeProjectTags, removeProjectTagsFailure, removeProjectTagsSuccess, removeProjectTeams, removeProjectTeamsFailure, removeProjectTeamsSuccess, updateProject, updateProjectFailure, updateProjectSucess } from "./single-project.actions";
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class SingleProjectEffects {
  constructor(
    private projectService: ProjectService,
    private actions$: Actions,
  ) {}

  loadProjectById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectById),
      switchMap((args) =>
        this.projectService.getProjectById(args.projectId).pipe(
          map((project) => loadProjectByIdSuccess({ project: project })),
          catchError((error) => of(loadProjectByIdFailure({ error }))),
        ),
      ),
    ),
  );

  updateProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProject),
      switchMap((args) =>
        this.projectService.updateProject(args.projectId, args.dto).pipe(
          map((project) => updateProjectSucess({ project: project })),
          catchError((error) => of(updateProjectFailure({ error }))),
        ),
      ),
    ),
  );

  loadProjectTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectTeams),
      switchMap((args) =>
        this.projectService.getProjectTeams(args.projectId).pipe(
          map((teams) => loadProjectTeamsSuccess({ teams: teams })),
          catchError((error) => of(loadProjectTeamsFailure({ error }))),
        ),
      ),
    ),
  );

  loadProjectTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectTags),
      switchMap((args) =>
        this.projectService.getProjectTags(args.projectId).pipe(
          map((tags) => loadProjectTagsSuccess({ tags: tags })),
          catchError((error) => of(loadProjectTagsFailure({ error }))),
        ),
      ),
    ),
  );

  loadProjectEnvironments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectEnvironments),
      switchMap((args) =>
        this.projectService.getProjectEnvironments(args.projectId).pipe(
          map((environments) => loadProjectEnvironmentsSuccess({ environments: environments })),
          catchError((error) => of(loadProjectEnvironmentsFailure({ error }))),
        ),
      ),
    ),
  );

  loadProjectDebugFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectDebugFiles),
      switchMap((args) =>
        this.projectService.getProjectDebugFiles(args.projectId).pipe(
          map((files) => loadProjectDebugFilesSuccess({ debugFiles: files })),
          catchError((error) => of(loadProjectDebugFilesFailure({ error }))),
        ),
      ),
    ),
  );

  loadProjectReleases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProjectReleases),
      switchMap((args) =>
        this.projectService.getProjectReleases(args.projectId).pipe(
          map((releases) => loadProjectReleasesSuccess({ releases: releases })),
          catchError((error) => of(loadProjectReleasesFailure({ error }))),
        ),
      ),
    ),
  );

  addProjectTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectTeams),
      switchMap((args) =>
        this.projectService.addProjectTeams(args.projectId, args.ids).pipe(
          map((teams) => addProjectTeamsSuccess({ teams: teams })),
          catchError((error) => of(addProjectTeamsFailure({ error }))),
        ),
      ),
    ),
  );

  removeProjectTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProjectTeams),
      switchMap((args) =>
        this.projectService.removeProjectTeams(args.projectId, args.ids).pipe(
          map((teams) => removeProjectTeamsSuccess({ teams: teams })),
          catchError((error) => of(removeProjectTeamsFailure({ error }))),
        ),
      ),
    ),
  );

  removeProjectTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProjectTags),
      switchMap((args) =>
        this.projectService.removeProjectTags(args.projectId, args.tags).pipe(
          map((tags) => removeProjectTagsSuccess({ tags: tags })),
          catchError((error) => of(removeProjectTagsFailure({ error }))),
        ),
      ),
    ),
  );

  addProjectTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectTags),
      switchMap((args) =>
        this.projectService.addProjectTags(args.projectId, args.tags).pipe(
          map((tags) => addProjectTagsSuccess({ tags: tags })),
          catchError((error) => of(addProjectTagsFailure({ error }))),
        ),
      ),
    ),
  );

  removeProjectEnvironments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProjectEnvironments),
      switchMap((args) =>
        this.projectService.removeProjectEnvironments(args.projectId, args.environments).pipe(
          map((environments) => removeProjectEnvironmentsSuccess({ environments: environments })),
          catchError((error) => of(removeProjectEnvironmentsFailure({ error }))),
        ),
      ),
    ),
  );

  addProjectEnvironments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectEnvironments),
      switchMap((args) =>
        this.projectService.addProjectEnvironments(args.projectId, args.environments).pipe(
          map((environments) => addProjectEnvironmentsSuccess({ environments: environments })),
          catchError((error) => of(addProjectEnvironmentsFailure({ error }))),
        ),
      ),
    ),
  );

  removeProjectReleases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProjectReleases),
      switchMap((args) =>
        this.projectService.removeProjectReleases(args.projectId, args.ids).pipe(
          map((releases) => removeProjectReleasesSuccess({ releases: releases })),
          catchError((error) => of(removeProjectReleasesFailure({ error }))),
        ),
      ),
    ),
  );

  addProjectRelease$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectRelease),
      switchMap((args) =>
        this.projectService.addProjectRelease(args.projectId, args.dto).pipe(
          map((releases) => addProjectReleaseSuccess({ releases: releases })),
          catchError((error) => of(addProjectReleaseFailure({ error }))),
        ),
      ),
    ),
  );

  removeProjectDebugFiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeProjectDebugFiles),
      switchMap((args) =>
        this.projectService.removeProjectDebugFiles(args.projectId, args.ids).pipe(
          map((files) => removeProjectDebugFilesSuccess({ debugFiles: files })),
          catchError((error) => of(removeProjectDebugFilesFailure({ error }))),
        ),
      ),
    ),
  );

  addProjectDebugFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectDebugFile),
      switchMap((args) =>
        this.projectService.addProjectDebugFile(args.projectId, args.dto).pipe(
          map((files) => addProjectDebugFileSuccess({ debugFiles: files })),
          catchError((error) => of(addProjectDebugFileFailure({ error }))),
        ),
      ),
    ),
  );
}
