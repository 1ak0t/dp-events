import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {UserEntity} from "../user/index.js";
import {EventStatuses} from "../../types/event.type.js";

export interface EventEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'events',
        timestamps: true,
    }
})
export class EventEntity extends defaultClasses.TimeStamps {
    @prop({required: true})
    public jobName: string;
    @prop({required: true})
    public name: string;
    @prop({required: true})
    public deadLine: string;
    @prop({required: true})
    public documents: string;
    @prop({
        ref: UserEntity,
        default: []
    })
    public mainPerson: Ref<UserEntity>[];
    @prop({
        ref: UserEntity,
        required: true,
    })
    public createPerson: Ref<UserEntity>;
    @prop({
        ref: UserEntity,
        default: []
    })
    public readPerson: Ref<UserEntity>[];
    @prop({
        type: String,
        enum: EventStatuses,
        default: null
    })
    public status: EventStatuses | null;
    @prop()
    public completedTime: string;
    @prop()
    public completedComment: string;
    @prop()
    public completedFile: string;
    @prop({
        ref: UserEntity,
    })
    public completedPerson: Ref<UserEntity>;
}

export const EventModel = getModelForClass(EventEntity);