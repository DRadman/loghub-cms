import { AuthEffects } from './auth/auth.effects';
import { AuthState, authReducer } from './auth/auth.reducer';
import { MembersEffects } from './members/members.effects';
import { MembersState, membersReducer } from './members/members.reducer';
import { OrganizationEffects } from './organization/organization.effects';
import {
  OrganizationState,
  organizationReducer,
} from './organization/organization.reducer';
import { RoleEffects } from './role/role.effects';
import { RoleState, roleReducer } from './role/role.reducer';

export interface AppState {
  authState: AuthState;
  organizationState: OrganizationState;
  membersState: MembersState;
  roleState: RoleState;
}

export const appEfects = [
  AuthEffects,
  OrganizationEffects,
  MembersEffects,
  RoleEffects,
];
export const appStore = {
  authState: authReducer,
  organizationState: organizationReducer,
  membersState: membersReducer,
  roleState: roleReducer,
};
