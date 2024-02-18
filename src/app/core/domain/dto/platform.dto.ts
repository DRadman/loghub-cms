import { PlatformType } from "../models/enums/platform-type.enum";

export interface PlatformDto {
  platformId: string;
  type: PlatformType;
  version: string;
  iconUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
