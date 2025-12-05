import {Expose, Type} from "class-transformer";
import {BreakRdo} from "../../break/rdo/break.rdo.js";
import {SupplyStatus} from "../../../types/supply.type.js";

export class SupplyRdo {
    @Expose()
    public id: string;
    @Expose()
    @Type(() => BreakRdo)
    public break: BreakRdo;
    @Expose()
    supplyTitle: string;
    @Expose()
    supplyDescription: string;
    @Expose()
    supplyImage: string;
    @Expose()
    supplyStatus: SupplyStatus | null;
    @Expose()
    acceptedDate: string;
    @Expose()
    paymentDate: string;
    @Expose()
    deliveryDate: string;
    @Expose()
    inStockDate: string;
}