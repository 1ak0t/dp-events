import {CreateEventDto} from "./dto/create-event.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {EventEntity} from "./event.entity.js";
import {EventStatuses} from "../../types/event.type.js";

export interface EventServiceInterface {
    create(dto: CreateEventDto): Promise<DocumentType<EventEntity>>;
    findAll(): Promise<EventEntity[]>;
    findByIdAndUpdateStatus(id: string, status: EventStatuses): Promise<DocumentType<EventEntity> | null>;
    findByIdAndUpdateReadPerson(userId: string, eventId: string): Promise<DocumentType<EventEntity> | null>;
    findById(eventId: string): Promise<DocumentType<EventEntity> | null>;
}