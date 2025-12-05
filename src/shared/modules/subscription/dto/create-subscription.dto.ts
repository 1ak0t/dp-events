import {UserRoles} from "../../../types/user.type.js";

export interface PushSubscriptionDTO {
    endpoint: string;
    expirationTime: number | null;
    keys: {
        p256dh: string;
        auth: string;
    };
    roles: UserRoles;
}