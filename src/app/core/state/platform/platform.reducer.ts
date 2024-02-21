import { createReducer, on } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Platform } from '../../domain/models/platform.entity';
import {
  loadPlatforms,
  loadPlatformsFailure,
  loadPlatformsSuccess,
} from './platform.actions';

export interface PlatformState {
  platforms: Platform[] | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any | null;
  status: StateStatus;
}

export const initialState: PlatformState = {
  platforms: null,
  error: undefined,
  status: StateStatus.PENDING,
};

export const platformReducer = createReducer(
  initialState,

  //Handle loading current organization members
  on(loadPlatforms, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle load success
  on(loadPlatformsSuccess, (state, params) => ({
    ...state,
    platforms: params.platforms,
    error: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle load failure
  on(loadPlatformsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),
);
