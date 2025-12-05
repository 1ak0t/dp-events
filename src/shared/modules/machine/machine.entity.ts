import {defaultClasses, getModelForClass, modelOptions, prop} from "@typegoose/typegoose";
import {MachinesStatus, MachineType} from "../../types/machine.type.js";

export interface MachineEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'machines',
        timestamps: true
    }
})
export class MachineEntity extends defaultClasses.TimeStamps implements MachineType{
    @prop({required: true, unique: true})
    public name: string;
    @prop({required: true})
    public status: MachinesStatus;
}

export const MachineModel = getModelForClass(MachineEntity);