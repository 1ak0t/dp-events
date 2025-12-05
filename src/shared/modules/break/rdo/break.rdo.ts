import {RepairStage} from "../../../types/break.type.js";
import {Expose, Type} from "class-transformer";
import {MachineRdo} from "../../machine/rdo/machine.rdo.js";
import {UserRdo} from "../../user/index.js";

export class BreakRdo {
    @Expose()
    public id: string;
    @Expose()
    public breakName: string;
    @Expose()
    @Type(() => UserRdo)
    public registerPerson: UserRdo;
    @Expose()
    public registerDate: string;
    @Expose()
    public registerComment?: string;
    @Expose()
    public registerImage?: string | undefined;
    @Expose()
    @Type(() => UserRdo)
    successPerson?: string;
    @Expose()
    successDate?: string;
    @Expose()
    successComment?: string;
    @Expose()
    successImage?: string | undefined;
    @Expose()
    @Type(() => UserRdo)
    repairingPerson?: string;
    @Expose()
    repairingDate?: string;
    @Expose()
    repairingComment?: string;
    @Expose()
    repairingImage?: string | undefined;
    @Expose()
    @Type(() => UserRdo)
    repairCompletedPerson?: string;
    @Expose()
    repairCompletedDate?: string;
    @Expose()
    repairCompletedComment?: string;
    @Expose()
    repairCompletedImage?: string | undefined;
    @Expose()
    @Type(() => UserRdo)
    repairEndPerson?: string;
    @Expose()
    repairEndDate?: string;
    @Expose()
    repairEndComment?: string;
    @Expose()
    public priority: number;
    @Expose()
    public status: boolean;
    @Expose()
    public stages: null | RepairStage;
    @Expose()
    @Type(() => MachineRdo)
    public machine: MachineRdo;
}