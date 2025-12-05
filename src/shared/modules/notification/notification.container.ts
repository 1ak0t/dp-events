import {Container} from "inversify";
import {types} from "@typegoose/typegoose";
import {NotificationEntity, NotificationModel} from "./notification.entity.js";
import {Component} from "../../types/index.js";
import {NotificationServiceInterface} from "./notification-service.interface.js";
import {DefaultNotificationService} from "./default-notification.service.js";
import {ControllerInterface} from "../../libs/rest/index.js";
import {NotificationController} from "./notification.controller.js";

export function createNotificationContainer() {
    const notificationContainer = new Container();
    notificationContainer.bind<types.ModelType<NotificationEntity>>(Component.NotificationModel).toConstantValue(NotificationModel);
    notificationContainer.bind<NotificationServiceInterface>(Component.NotificationService).to(DefaultNotificationService).inSingletonScope();
    notificationContainer.bind<ControllerInterface>(Component.NotificationController).to(NotificationController).inSingletonScope();

    return notificationContainer;
}