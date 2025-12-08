import {UserRoles} from "../../../types/user.type.js";

export class UpdateUserDto {
    public email?: string;
    public subscription?: string;
    public notificationsCount?: number;
    public role?: UserRoles[];
    public jobTitle?: string;
}