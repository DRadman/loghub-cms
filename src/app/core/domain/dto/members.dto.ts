import { InvitationDto } from "./invitation.dto";
import { UserDto } from "./user.dto";

export interface MembersDto {
    users: UserDto[];
    invitations: InvitationDto[];
    owner: UserDto;
}