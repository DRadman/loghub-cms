import { createAction, props } from '@ngrx/store';
import { Organization } from '../../domain/models/organization.entity';
import { CreateOrganizationRequestDto } from '../../domain/dto/requests/create-organization-request.dto';
import { FileDto } from '../../domain/dto/file.dto';

export const loadCurrentOrganization = createAction(
  '[Organization Page] Load current organization',
);

export const loadCurrentOrganizationSuccess = createAction(
  '[Organization API] Get organization success',
  props<Organization>(),
);

export const loadCurrentOrganizationFailure = createAction(
  '[Organization API] Get organization failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const createOrganization = createAction(
  '[Organization Page] Create organization',
  props<CreateOrganizationRequestDto>(),
);

export const createOrganizationSuccess = createAction(
  '[Organization API] Create organization success',
  props<Organization>(),
);

export const createOrganizationFailure = createAction(
  '[Organization API] Create organization failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>(),
);

export const updateOrganizationPicture = createAction(
  '[Organization Page] Update organization picture',
  props<{file: File}>()
)

export const updateOrganizationPictureSuccess = createAction(
  '[Organization Api] Update organization picture success',
  props<FileDto>()
)

export const updateOrganizationPictureFailure = createAction(
  '[Organization Api] Update organization picture failure',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{error: any}>()
)