import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducer';
import { StateStatus } from '../../domain/models/enums/state-status.enum';

export const selectAuth = (state: AppState) => state.authState;

export const isLoading = createSelector(
    selectAuth,
    (state: AuthState) => state.status
)