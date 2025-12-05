import {CreateBreakTypeByMachineDto} from "./dto/create-break-type-by-machine.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {BreakTypeByMachineEntity} from "./break-type-by-machine.entity.js";

export interface BreakTypeByMachineServiceInterface {
    create(dto: CreateBreakTypeByMachineDto): Promise<DocumentType<BreakTypeByMachineEntity>>;
    find(): Promise<DocumentType<BreakTypeByMachineEntity>[]>;
}