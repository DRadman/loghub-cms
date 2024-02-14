import { createAction, props } from '@ngrx/store';
import { AuthenticateRequestDto } from '../../domain/dto/requests/authenticate-request.dto';
import { Token } from '../../domain/models/token.entity';
import { User } from '../../domain/models/user.entity';
import { ResetPasswordRequestDto } from '../../domain/dto/requests/reset-password-request.dto';

export const authenticate = createAction(
  '[Login Page] Authenticate',
  props<AuthenticateRequestDto>()
);

export const loadCurrentUser = createAction(
  '[Login Page] Get authenticated user'
);

export const setCurrentUser = createAction(
  '[Login Page] Set current user',
  props<User>()
);

export const setToken = createAction(
  '[Login Page] Set current user',
  props<Token>()
);

export const loadCurrentUserSuccess = createAction(
  '[Auth API] Get authenticated user success',
  props<User>()
);

export const loadCurrentUserFailure = createAction(
  '[Auth API] Get authenticated user failure',
  props<{ error: any }>()
);

export const authenticationSuccess = createAction(
  '[Auth API] Authentication success',
  props<Token>()
);

export const authenticationFailure = createAction(
  '[Auth API] Authentication failure',
  props<{ error: any }>()
);

export const signOut = createAction(
  '[Home Page] Sign Out',
);

export const forgotPassword = createAction(
  '[ForgotPassword Page] forgot password',
  props<{username: string}>(),
)

export const forgotPasswordSuccess = createAction(
  '[Auth Api] Forgot password success'
)

export const forgotPasswordFailure = createAction(
  '[Auth Api] Forgot password failure',
  props<{ error: any }>()
)

export const resetPassword = createAction(
  '[ResetPassword Page] Reset password',
  props<ResetPasswordRequestDto>(),
)

export const resetPasswordSuccess = createAction(
  '[Auth Api] Reset password success'
)

export const resetPasswordFailure = createAction(
  '[Auth Api] Reset password failure',
  props<{ error: any }>()
)