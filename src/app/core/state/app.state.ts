import { AuthEffects } from './auth/auth.effects';
import { AuthState, authReducer } from './auth/auth.reducer';
import { MembersEffects } from './members/members.effects';
import { MembersState, membersReducer } from './members/members.reducer';
import { OrganizationEffects } from './organization/organization.effects';
import {
  OrganizationState,
  organizationReducer,
} from './organization/organization.reducer';
import { ProjectEffects } from './project/project.effects';
import { ProjectState, projectReducer } from './project/project.reducer';
import { RoleEffects } from './role/role.effects';
import { RoleState, roleReducer } from './role/role.reducer';
import { TeamEffects } from './team/team.effects';
import { TeamState, teamReducer } from './team/team.reducer';
import { PlatformState, platformReducer } from './platform/platform.reducer';
import { PlatformEffects } from './platform/platform.effects';
import { SingleTeamEffects } from './single-team/single-team.effects';
import { SingleTeamState, singleTeamReducer } from './single-team/single-team.reducer';

export interface AppState {
  authState: AuthState;
  organizationState: OrganizationState;
  membersState: MembersState;
  roleState: RoleState;
  teamState: TeamState;
  projectState: ProjectState;
  platformState: PlatformState;
  singleTeamState: SingleTeamState;
}

export const appEfects = [
  AuthEffects,
  OrganizationEffects,
  MembersEffects,
  RoleEffects,
  TeamEffects,
  ProjectEffects,
  PlatformEffects,
  SingleTeamEffects
];

export const appStore = {
  authState: authReducer,
  organizationState: organizationReducer,
  membersState: membersReducer,
  roleState: roleReducer,
  teamState: teamReducer,
  projectState: projectReducer,
  platformState: platformReducer,
  singleTeamState: singleTeamReducer,
};
