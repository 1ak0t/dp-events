import {Expose} from "class-transformer";
import {UserRoles} from "../../../types/user.type.js";

export class LoggedUserRdo {
    @Expose()
    public id: string;

    @Expose()
    public token: string;

    @Expose()
    public email: string;

    @Expose()
    public surname: string;

    @Expose()
    public name: string;

    @Expose()
    public middleName: string;

    @Expose()
    public role: UserRoles[];

    @Expose()
    public notificationsCount: string;
}