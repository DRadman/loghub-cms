import { AuthEffects } from './auth/auth.effects';
import { AuthState, authReducer } from './auth/auth.reducer';

export interface AppState {
  authState: AuthState;
}

export const appEfects = [AuthEffects];
export const appStore = {
  authState: authReducer,
};
