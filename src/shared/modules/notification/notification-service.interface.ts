import {CreateNotificationDto} from "./dto/create-notification.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {NotificationEntity} from "./notification.entity.js";

export interface NotificationServiceInterface {
    create(dto: CreateNotificationDto): Promise<DocumentType<NotificationEntity>>;
    find(): Promise<DocumentType<NotificationEntity>[]>;
}