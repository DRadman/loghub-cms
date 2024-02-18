import { Role } from "../models/user.entity";

export interface InvitationDto {
    invitationId: string,
    email: string,
    role: Role
}