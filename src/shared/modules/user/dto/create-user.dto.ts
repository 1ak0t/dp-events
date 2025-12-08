import {UserRoles} from "../../../types/user.type.js";

export class CreateUserDto {
    public surname: string;
    public name: string;
    public middleName: string;
    public email: string;
    public role: UserRoles[];
    public password: string;
    public jobTitle: string;
}