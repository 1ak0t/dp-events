import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from "@typegoose/typegoose";
import {BreakEntity} from "../break/break.entity.js";
import {SupplyStatus} from "../../types/supply.type.js";

export interface SupplyEntity extends defaultClasses.Base {}

@modelOptions({
    schemaOptions: {
        collection: 'supply',
        timestamps: true,
    }
})
export class SupplyEntity extends defaultClasses.TimeStamps {
    @prop({required: true, ref: BreakEntity})
    public break: Ref<BreakEntity>;
    @prop({required: true})
    public supplyTitle: string;
    @prop({required: true})
    public supplyDescription: string;
    @prop()
    public supplyImage: string;
    @prop({
        type: String,
        enum: SupplyStatus,
        default: null
    })
    public supplyStatus: SupplyStatus | null;
    @prop()
    public acceptedDate?: string;
    @prop()
    public paymentDate?: string;
    @prop()
    public deliveryDate?: string;
    @prop()
    public inStockDate?: string;
}

export const SupplyModel = getModelForClass(SupplyEntity);