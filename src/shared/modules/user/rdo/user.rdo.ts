import {Expose} from "class-transformer";
import {UserRoles} from "../../../types/user.type.js";

export class UserRdo {
    @Expose()
    public surname: string;

    @Expose()
    public name: string;

    @Expose()
    public middleName: string;

    @Expose()
    public email: string;

    @Expose()
    public role: UserRoles[];

    @Expose()
    public notificationsCount: string;

    @Expose()
    public jobTitle: string;
}