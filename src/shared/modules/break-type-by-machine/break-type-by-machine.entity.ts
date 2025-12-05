import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {MachineEntity} from "../machine/machine.entity.js";

export interface BreakTypeByMachineEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'break-types-by-machine',
        timestamps: true
    }
})
export class BreakTypeByMachineEntity extends defaultClasses.TimeStamps {
    @prop({required: true})
    public description: string;
    @prop({required: true, ref: MachineEntity})
    public machine: Ref<MachineEntity>;
}

export const BreakTypeByMachineModel = getModelForClass(BreakTypeByMachineEntity);