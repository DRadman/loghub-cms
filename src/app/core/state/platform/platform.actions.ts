import { createAction, props } from '@ngrx/store';
import { Platform } from '../../domain/models/platform.entity';

export const loadPlatforms = createAction('[Platforms Page] Load platforms');

export const loadPlatformsSuccess = createAction(
  '[Platform API] Get roles success',
  props<{ platforms: Platform[] }>(),
);

export const loadPlatformsFailure = createAction(
  '[Platform API] Get platform failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);
