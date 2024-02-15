import { createSelector } from '@ngrx/store';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducer';

export const selectAuth = (state: AppState) => state.authState;

export const isLoadingAuthState = createSelector(
  selectAuth,
  (state: AuthState) => state.status == StateStatus.LOADING,
);

export const isSuccess = createSelector(
  selectAuth,
  (state: AuthState) => state.status == StateStatus.SUCCESS,
);

export const selectCurrentUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user,
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
  },
);

export const selectCurrentUserError = createSelector(
  selectAuth,
  (state: AuthState) => {
    if (
      state.user == null &&
      state.status == StateStatus.ERROR &&
      state.error
    ) {
      return state.error;
    } else {
      return null;
    }
  },
);

export const selectForgotPasswordError = createSelector(
  selectAuth,
  (state: AuthState) => state.forgotPasswordError,
);

export const selectResetPasswordError = createSelector(
  selectAuth,
  (state: AuthState) => state.resetPasswordError,
);

export const selectRegistrationError = createSelector(
  selectAuth,
  (state: AuthState) => state.registrationError,
);
