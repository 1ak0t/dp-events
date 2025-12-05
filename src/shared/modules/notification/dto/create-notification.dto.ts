import {UserRoles} from "../../../types/user.type.js";

export class CreateNotificationDto {
    title: string;
    text: string;
    roles?: UserRoles[];
}