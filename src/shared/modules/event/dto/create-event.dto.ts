import {EventStatuses} from "../../../types/event.type.js";
import {UserEntity} from "../../user/index.js";

export class CreateEventDto {
    jobName: string;
    name: string;
    deadLine: string;
    documents: string;
    mainPerson: string[];
    createPerson: string;
    readPerson: UserEntity[] | null;
    status: EventStatuses | null;
}

export class successWarningEventDto {
    userId: string;
    eventId: string;
}