import {UserRoles} from "../../../types/user.type.js";

export class UpdateUserDto {
    public subscription?: string;
    public notificationsCount?: number;
    public role?: UserRoles[];
    public jobTitle?: string;
    public surname?: string;
    public name?: string;
    public middleName?: string;
}