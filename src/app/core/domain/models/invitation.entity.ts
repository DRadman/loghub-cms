import { Role } from "./user.entity";

export interface Invitation {
    invitationId: string,
    email: string,
    role: Role
}