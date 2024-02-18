import { Permission } from "./enums/permission.enum";
import { ResourceType } from "./enums/resource-type.enum";

export interface User {
    userId: string;
    username: string;
    lastLoginTime: Date;
    email: string;
    firstName: string;
    lastName: string;
    profileIconUrl: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    activated: boolean;
  }

  export interface Role {
    roleId: string;
    name: string;
    permissions: [
      {
        type: ResourceType;
        values: Permission[];
      }
    ];
    internal: boolean;
  }