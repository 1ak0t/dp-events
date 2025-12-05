import {RepairStage} from "../../../types/break.type.js";

export class CreateBreakDto {
    breakName: string;
    registerPerson: string;
    registerDate: string;
    registerComment?: string;
    registerImage?: string;
    priority: number;
    status: boolean;
    stages: null | RepairStage;
    machine: string;
}