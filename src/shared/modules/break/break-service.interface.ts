import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {CreateBreakDto} from "./dto/create-break.dto.js";
import {BreakEntity} from "./break.entity.js";
import {UpdateBreakDto} from "./dto/update-break.dto.js";

export interface BreakServiceInterface {
    create(dto: CreateBreakDto): Promise<DocumentType<BreakEntity>>;
    find(): Promise<DocumentType<BreakEntity>[]>;
    updateById(breakId: string, dto: UpdateBreakDto): Promise<DocumentType<BreakEntity> | null>;
    deleteById(breakId: string): Promise<DocumentType<BreakEntity> | null>;
}