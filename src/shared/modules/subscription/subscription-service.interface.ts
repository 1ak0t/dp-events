import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {SubscriptionEntity} from "./subscription.entity.js";
import {PushSubscription} from "web-push";
import {UserRoles} from "../../types/user.type.js";

export interface SubscriptionServiceInterface {
    create(dto: PushSubscription): Promise<DocumentType<SubscriptionEntity>>;
    getAll(roles: UserRoles[]): Promise<DocumentType<SubscriptionEntity>[]>;
}