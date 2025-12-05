import {inject, injectable} from "inversify";
import {NotificationServiceInterface} from "./notification-service.interface.js";
import {Component} from "../../types/index.js";
import {CreateNotificationDto} from "./dto/create-notification.dto.js";
import {DocumentType} from "@typegoose/typegoose/lib/types.js";
import {NotificationEntity} from "./notification.entity.js";
import {types} from "@typegoose/typegoose";

@injectable()
export class DefaultNotificationService implements NotificationServiceInterface {
    constructor(
        @inject(Component.NotificationModel) private readonly notificationModel: types.ModelType<NotificationEntity>
    ) {
    }

    public async create(dto: CreateNotificationDto): Promise<DocumentType<NotificationEntity>> {
        return await this.notificationModel.create(dto);
    }

    public async find(): Promise<DocumentType<NotificationEntity>[]> {
        return this.notificationModel.find().exec();
    }
}