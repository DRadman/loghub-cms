import { PlatformType } from "./enums/platform-type.enum";

export interface Platform {
    platformId: string;
    type: PlatformType;
    version: string;
    iconUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
  