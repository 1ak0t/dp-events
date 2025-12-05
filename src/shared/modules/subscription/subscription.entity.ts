import {defaultClasses, getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {UserRoles} from "../../types/user.type.js";

export interface SubscriptionEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'subscriptions',
        timestamps: true
    }
})
export class SubscriptionEntity extends defaultClasses.TimeStamps{
    @prop({unique: true, required: true})
    public endpoint: string;
    @prop()
    public expirationTime: number | null;
    @prop()
    public keys: {
        auth: string,
        p256dh: string,
    };
    @prop()
    public roles?: UserRoles[] | undefined;
}

export const SubscriptionModel = getModelForClass(SubscriptionEntity);