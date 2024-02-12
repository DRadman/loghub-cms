import { createReducer, on } from '@ngrx/store';
import { Token } from '../../domain/models/token.entity';
import { User } from '../../domain/models/user.entity';
import {
  authenticate,
  authenticationFailure,
  authenticationSuccess,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
} from './auth.actions';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { AuthenticateRequestDto } from '../../domain/dto/requests/authenticate-request.dto';

export interface AuthState {
  user: User | null;
  error: string | null;
  token: Token | null;
  credentials: AuthenticateRequestDto | null;
  status: StateStatus;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  token: null,
  credentials: null,
  status: StateStatus.PENDING,
};

export const authReducer = createReducer(
  initialState,

  //Handle loading current user
  on(loadCurrentUser, (state) => ({ ...state, status: StateStatus.LOADING })),

  //Handle authenticate action
  on(authenticate, (state, credentials) => ({
    ...state,
    credentials: credentials,
    status: StateStatus.LOADING,
  })),

  //Handle authentication success
  on(authenticationSuccess, (state, token) => ({
    ...state,
    token: token,
    status: StateStatus.SUCCESS,
  })),

  //Handle authentication failure
  on(authenticationFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),

  //Handle load current user success
  on(loadCurrentUserSuccess, (state, user) => ({
    ...state,
    user: user,
    status: StateStatus.SUCCESS,
  })),

  //Handle load current user failure
  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.ERROR,
  })),
);
