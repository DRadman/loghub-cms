import { createReducer, on } from '@ngrx/store';
import { AuthenticateRequestDto } from '../../domain/dto/requests/authenticate-request.dto';
import { StateStatus } from '../../domain/models/enums/state-status.enum';
import { Token } from '../../domain/models/token.entity';
import { User } from '../../domain/models/user.entity';
import {
  authenticate,
  authenticationFailure,
  authenticationSuccess,
  forgotPassword,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  loadCurrentUser,
  loadCurrentUserFailure,
  loadCurrentUserSuccess,
  registerNewUser,
  registerNewUserFailure,
  registerNewUserSuccess,
  resetPassword,
  resetPasswordFailure,
  resetPasswordSuccess,
  setCurrentUser,
  setToken,
  signOut,
} from './auth.actions';

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  user: User | null;
  error: any | null;
  forgotPasswordError: null | any;
  resetPasswordError: null | any;
  registrationError: null | any;
  usernameCheckError: null | any;
  isUsernameAvialable: boolean | null;
  token: Token | null;
  credentials: AuthenticateRequestDto | null;
  status: StateStatus;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  forgotPasswordError: null,
  resetPasswordError: null,
  registrationError: null,
  usernameCheckError: null,
  isUsernameAvialable: null,
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
  on(signOut, () => initialState),

  // Handle Forgot Password
  on(forgotPassword, (state) => ({
    ...state,
    status: StateStatus.LOADING,
  })),

  // Handle Forgot Password Success
  on(forgotPasswordSuccess, (state) => ({
    ...state,
    forgotPasswordError: null,
    status: StateStatus.SUCCESS,
  })),

  // Handle Forgot Password Failure
  on(forgotPasswordFailure, (state, { error }) => ({
    ...state,
    forgotPasswordError: error,
    status: StateStatus.ERROR,
  })),

  // Handle Reset Password
  on(resetPassword, (state) => ({
    ...state,
    status: StateStatus.LOADING,
  })),

  // Handle Reset Password Success
  on(resetPasswordSuccess, (state) => ({
    ...state,
    resetPasswordError: null,
    status: StateStatus.SUCCESS,
  })),

  // Handle Reset Password Failure
  on(resetPasswordFailure, (state, { error }) => ({
    ...state,
    resetPasswordError: error,
    status: StateStatus.ERROR,
  })),

  // Handle Register new user
  on(registerNewUser, (state) => ({
    ...state,
    status: StateStatus.LOADING,
  })),

  // Handle Register new user success
  on(registerNewUserSuccess, (state) => ({
    ...state,
    registrationError: null,
    status: StateStatus.SUCCESS,
  })),

  // Handle Register new user failure
  on(registerNewUserFailure, (state, { error }) => ({
    ...state,
    registrationError: error,
    status: StateStatus.ERROR,
  })),
);
