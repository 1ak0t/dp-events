import {CreateMachineDto} from "./dto/create-machine.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {MachineEntity} from "./machine.entity.js";
import {UpdateMachineDto} from "./dto/update-machine.dto.js";

export interface MachineServiceInterface {
    create(dto: CreateMachineDto): Promise<DocumentType<MachineEntity>>;
    find(): Promise<DocumentType<MachineEntity>[]>;
    updateById(machineId: string, dto: UpdateMachineDto): Promise<DocumentType<MachineEntity> | null>;
    findById(machineId: string): Promise<DocumentType<MachineEntity> | null>;
}