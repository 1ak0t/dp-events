import {SupplyStatus} from "../../../types/supply.type.js";

export class ChangeSupplyStatusDto {
    supplyStatus?: SupplyStatus;
    registerDate?: string;
    acceptedDate?: string;
    paymentDate?: string;
    deliveryDate?: string;
    inStockDate?: string;
    supplyImage?: string;
}