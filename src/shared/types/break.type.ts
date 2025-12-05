import {MachineType} from "./machine.type.js";

export enum RepairStage {
    Register = "Зарегистрирована",
    RepairSuccess = "Поломка потверждена",
    Repairing = "Ремонт",
    RepairCompleted = "Ремонт выполнен",
    Supply = "Ожидает снабжения"
}

export type BreakType = {
    breakName: string,
    registerPerson: string,
    registerDate: string,
    successPerson?: string,
    successDate?: string,
    repairingPerson?: string,
    repairingDate?: string,
    repairCompletedPerson?: string,
    repairCompletedDate?: string,
    repairEndPerson?: string,
    repairEndDate?: string,
    comment?: string,
    priority: number,
    status: boolean,
    stages: null | RepairStage,
    machineId: MachineType
}