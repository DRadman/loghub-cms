import { AuthEffects } from './auth/auth.effects';
import { AuthState, authReducer } from './auth/auth.reducer';
import { OrganizationEffects } from './organization/organization.effects';
import { OrganizationState, organizationReducer } from './organization/organization.reducer';

export interface AppState {
  authState: AuthState;
  organizationState: OrganizationState
}

export const appEfects = [AuthEffects, OrganizationEffects];
export const appStore = {
  authState: authReducer,
  organizationState: organizationReducer,
};
