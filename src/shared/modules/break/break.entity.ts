import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {RepairStage} from "../../types/break.type.js";
import {MachineEntity} from "../machine/machine.entity.js";
import {UserEntity} from "../user/index.js";

export interface BreakEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'breaks',
        timestamps: true
    }
})
export class BreakEntity extends defaultClasses.TimeStamps{
    @prop({required: true})
    public breakName: string;
    @prop({
        ref: UserEntity,
    })
    public registerPerson: Ref<UserEntity>;
    @prop({required: true})
    public registerDate: string;
    @prop()
    public registerComment?: string;
    @prop()
    public registerImage?: string;
    @prop({
        ref: UserEntity,
    })
    public successPerson?: Ref<UserEntity>;
    @prop()
    public successDate?: string;
    @prop()
    public successComment?: string;
    @prop()
    public successImage?: string;
    @prop({
        ref: UserEntity,
    })
    public repairingPerson?: Ref<UserEntity>;
    @prop()
    public repairingDate?: string;
    @prop()
    public repairingComment?: string;
    @prop()
    public repairingImage?: string;
    @prop({
        ref: UserEntity,
    })
    public repairCompletedPerson?: Ref<UserEntity>;
    @prop()
    public repairCompletedDate?: string;
    @prop()
    public repairCompletedComment?: string;
    @prop()
    public repairCompletedImage?: string;
    @prop({
        ref: UserEntity,
    })
    public repairEndPerson?: Ref<UserEntity>;
    @prop()
    public repairEndDate?: string;
    @prop()
    public repairEndComment?: string;
    @prop()
    public repairEndImage?: string;
    @prop({required: true})
    public priority: number;
    @prop({required: true, default: false})
    public status: boolean;
    @prop({
        type: String,
        enum: RepairStage,
        default: null
    })
    public stages: RepairStage | null;

    @prop({
        ref: MachineEntity,
        required: true,
    })
    public machine!: Ref<MachineEntity>;
}

export const BreakModel = getModelForClass(BreakEntity);