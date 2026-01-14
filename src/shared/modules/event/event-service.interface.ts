import {CreateEventDto} from "./dto/create-event.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {EventEntity} from "./event.entity.js";
import {EventStatuses} from "../../types/event.type.js";
import {UpdateEventDto} from "./dto/update-event.dto.js";

export interface EventServiceInterface {
    create(dto: CreateEventDto): Promise<DocumentType<EventEntity>>;
    findAll(): Promise<EventEntity[]>;
    findByIdAndUpdateStatus(id: string, status: EventStatuses): Promise<DocumentType<EventEntity> | null>;
    findByIdAndUpdateReadPerson(userId: string, eventId: string): Promise<void>;
    findById(eventId: string): Promise<DocumentType<EventEntity> | null>;
    delete(eventId: string): Promise<void>;
    updateById(eventId: string, dto: UpdateEventDto): Promise<DocumentType<EventEntity> | null>;
}