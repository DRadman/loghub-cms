import { createSelector } from "@ngrx/store";
import { OrganizationState } from "./organization.reducer";
import { StateStatus } from "../../domain/models/enums/state-status.enum";
import { AppState } from "../app.state";

export const selectOrganization = (state: AppState) => state.organizationState;

export const selectCurrentOrganization = createSelector(
    selectOrganization,
    (state: OrganizationState) => state.organization,
  );

  export const isLoadingOrganization = createSelector(
    selectOrganization,
    (state: OrganizationState) => state.status == StateStatus.LOADING,
  );

  export const selectOrganizationError = createSelector(
    selectOrganization,
    (state: OrganizationState) => state.error,
  );