import {Expose} from "class-transformer";
import {UserRoles} from "../../../types/user.type.js";

export class NotificationRdo {
    @Expose()
    public id: string;
    @Expose()
    public title: string;
    @Expose()
    public text: string;
    @Expose()
    public createdAt: string;
    @Expose()
    public roles: UserRoles[];
}