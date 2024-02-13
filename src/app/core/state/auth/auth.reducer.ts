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
  setCurrentUser,
  setToken,
  signOut,
} from './auth.actions';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { AuthenticateRequestDto } from '../../domain/dto/requests/authenticate-request.dto';

export interface AuthState {
  user: User | null;
  error: any | null;
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
  on(loadCurrentUser, (state) => ({
    ...state,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle authenticate action
  on(authenticate, (state, credentials) => ({
    ...state,
    credentials: credentials,
    error: null,
    status: StateStatus.LOADING,
  })),

  //Handle authentication success
  on(authenticationSuccess, (state, token) => ({
    ...state,
    token: token,
    error: null,
    credentials: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle authentication failure
  on(authenticationFailure, (state, { error }) => ({
    ...state,
    token: null,
    error: error,
    status: StateStatus.ERROR,
  })),

  //Handle load current user success
  on(loadCurrentUserSuccess, (state, user) => ({
    ...state,
    user: user,
    error: null,
    status: StateStatus.SUCCESS,
  })),

  //Handle load current user failure
  on(loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    user: null,
    error: error,
    status: StateStatus.ERROR,
  })),

  //Handle set current user
  on(setCurrentUser, (state, user) => ({
    ...state,
    user: user,
    status: StateStatus.ERROR,
  })),

  // Handle set token
  on(setToken, (state, token) => ({
    ...state,
    token: token,
    status: StateStatus.ERROR,
  })),

  // Handle SignOut
  on(signOut, () => ({
    user: null,
    error: null,
    token: null,
    credentials: null,
    status: StateStatus.PENDING,
  }))
);
