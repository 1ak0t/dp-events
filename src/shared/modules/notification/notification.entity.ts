import {defaultClasses, getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {UserRoles} from "../../types/user.type.js";

export interface NotificationEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'notifications',
        timestamps: true
    }
})
export class NotificationEntity extends defaultClasses.TimeStamps {
    @prop({required: true})
    public title: string;
    @prop({required: true})
    public text: string;
    @prop()
    public roles: UserRoles[];
}

export const NotificationModel = getModelForClass(NotificationEntity);

