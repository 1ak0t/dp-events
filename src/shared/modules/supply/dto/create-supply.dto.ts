import {SupplyStatus} from "../../../types/supply.type.js";

export class CreateSupplyDto {
    break: string;
    supplyTitle: string;
    supplyDescription: string;
    supplyStatus: SupplyStatus | null;
}