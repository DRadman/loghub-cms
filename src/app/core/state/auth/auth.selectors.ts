import { createSelector } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.authState;

export const isLoadingAuthState = createSelector(
  selectAuth,
  (state: AuthState) => state.status == StateStatus.LOADING
);

export const selectCurrentUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectAuthorizationError = createSelector(
  selectAuth,
  (state: AuthState) => {
    if (
      state.token == null &&
      state.status == StateStatus.ERROR &&
      state.credentials != null
    ) {
      return state.error;
    } else {
      return null;
    }
  }
);
