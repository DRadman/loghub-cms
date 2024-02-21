import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PlatformState } from './platform.reducer';

export const selectPlatformState = (state: AppState) => state.platformState;

export const selectPlatforms = createSelector(
  selectPlatformState,
  (state: PlatformState) => state.platforms,
);
