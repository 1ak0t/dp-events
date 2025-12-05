import {RepairStage} from "../../../types/break.type.js";

export class UpdateBreakDto {
    registerImage?: string | undefined;
    successPerson?: string;
    successDate?: string;
    successComment?: string;
    successImage?: string | undefined;
    repairingPerson?: string;
    repairingDate?: string;
    repairingComment?: string;
    repairingImage?: string;
    repairCompletedPerson?: string;
    repairCompletedDate?: string;
    repairCompletedComment?: string;
    repairCompletedImage?: string;
    repairEndPerson?: string;
    repairEndDate?: string;
    repairEndComment?: string;
    repairEndImage?: string;
    status?: boolean;
    stages?: RepairStage | null;
    machine?: string;
}