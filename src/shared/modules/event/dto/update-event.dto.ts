import {EventStatuses} from "../../../types/event.type.js";
import {UserEntity} from "../../user/index.js";

export class UpdateEventDto {
    id: string;
    deadLine?: string;
    documents?: string;
    mainPerson?: string;
    readPerson?: UserEntity[] | null;
    status?: EventStatuses | null;
    completedTime?: string;
    completedComment?: string;
    completedFile?: string;
    completedPerson?: UserEntity;
}