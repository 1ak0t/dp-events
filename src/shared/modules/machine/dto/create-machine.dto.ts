import {MachinesStatus} from "../../../types/machine.type.js";

export class CreateMachineDto {
    name: string;
    status: MachinesStatus;
}