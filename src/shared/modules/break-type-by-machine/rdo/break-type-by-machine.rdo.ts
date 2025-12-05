import {Expose, Type} from "class-transformer";
import {MachineRdo} from "../../machine/rdo/machine.rdo.js";
export class BreakTypeByMachineRdo {
    @Expose()
    public _id: string;
    @Expose()
    public description: boolean;
    @Expose()
    @Type(() => MachineRdo)
    public machine: MachineRdo;
}