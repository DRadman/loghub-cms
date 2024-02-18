import { Permission } from '../models/enums/permission.enum';
import { ResourceType } from '../models/enums/resource-type.enum';

export interface UserDto {
  userId: string;
  username: string;
  lastLoginTime: Date;
  email: string;
  firstName: string;
  lastName: string;
  profileIconUrl: string | null;
  role: {
    roleId: string;
    name: string;
    permissions: [
      {
        type: ResourceType;
        values: Permission[];
      }
    ];
    internal: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  activated: boolean;
}
