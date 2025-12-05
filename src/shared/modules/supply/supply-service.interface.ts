import {CreateSupplyDto} from "./dto/create-supply.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {SupplyEntity} from "./supply.entity.js";
import {ChangeSupplyStatusDto} from "./dto/changeSupplyStatus.dto.js";

export interface SupplyServiceInterface {
    create(dto: CreateSupplyDto): Promise<DocumentType<SupplyEntity>>;
    getAll(): Promise<DocumentType<SupplyEntity>[]>;
    findByBreak(breakId: string): Promise<DocumentType<SupplyEntity>[]>;
    changeSupplyStatus(supplyId: string, dto: ChangeSupplyStatusDto): Promise<DocumentType<SupplyEntity> | null>;
}