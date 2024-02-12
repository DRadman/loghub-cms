import { createAction, props } from '@ngrx/store';
import { AuthenticateRequestDto } from '../../domain/dto/requests/authenticate-request.dto';
import { Token } from '../../domain/models/token.entity';
import { User } from '../../domain/models/user.entity';

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

export const loadCurrentUserSuccess = createAction(
  '[Auth API] Get authenticated user success',
  props<User>()
);

export const loadCurrentUserFailure = createAction(
  '[Auth API] Get authenticated user failure',
  props<{ error: string }>()
);

export const authenticationSuccess = createAction(
  '[Auth API] Authentication success',
  props<Token>()
);

export const authenticationFailure = createAction(
  '[Auth API] Authentication failure',
  props<{ error: string }>()
);
