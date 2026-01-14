import {Expose, Type} from "class-transformer";
import {UserRdo} from "../../user/index.js";
import {EventStatuses} from "../../../types/event.type.js";

export class EventRdo {
    @Expose()
    public id: string;
    @Expose()
    public jobName: string;
    @Expose()
    public name: string;
    @Expose()
    public deadLine: string;
    @Expose()
    public documents: string;
    @Expose()
    @Type(() => UserRdo)
    public mainPerson: UserRdo[];
    @Expose()
    @Type(() => UserRdo)
    public createPerson: UserRdo;
    @Expose()
    @Type(() => UserRdo)
    public readPerson: UserRdo[];
    @Expose()
    public status: EventStatuses | null;
    @Expose()
    public completedTime: string;
    @Expose()
    public completedComment: string;
    @Expose()
    public completedFile: string;
    @Expose()
    @Type(() => UserRdo)
    public completedPerson: UserRdo;
}