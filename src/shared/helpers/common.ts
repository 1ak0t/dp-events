import {ClassConstructor, plainToInstance} from "class-transformer";
import {MachinesStatus} from "../types/machine.type.js";

export function fillDTO<T,V>(someDto: ClassConstructor<T>, plainObject: V) {
    return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function createErrorObject(message: string) {
    return {
        error: message,
    };
}

export const getMachineStatusByPriority = (priority: number) => {
    let machineStatus: MachinesStatus = MachinesStatus.Work;

    switch (priority) {
        case 1:
            machineStatus = MachinesStatus.Wrong;
            break;
        case 2:
            machineStatus = MachinesStatus.Warning;
            break;
        case 3:
            machineStatus = MachinesStatus.Inspection;
            break;

    }

    return machineStatus;
}